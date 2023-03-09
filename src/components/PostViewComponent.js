import { createElement, formatPostCreateDate } from '../utils/util';
import { getData } from '../../api/firebase';

const PostView = () => {
  const $postView = createElement('div');
  const id = window.location.pathname.split('/').slice(-1)[0];

  getData(id)
    .then((post) => {
      if (!post.data()) throw new Error('존재하지 않는 게시글입니다.');

      const {
        title, contents, writer, contentDate,
      } = post.data();
      const $postViewHeader = createElement('div', '', 'post-view-header');
      const $postViewTitle = createElement('h1', `${title}`, 'post-view-title');
      const $postViewSubTitle = createElement(
        'div',
        ` 
          <div>${writer}</div>
          <div>작성일 ${formatPostCreateDate(contentDate.toDate())}<div>
        `,
        'post-view-title',
      );
      $postViewHeader.append($postViewTitle, $postViewSubTitle);
      const $postViewContents = createElement(
        'div',
        `
          <hr />
          <div>${contents}</div>
        `,
        'post-view-contents',
      );
      $postView.append(
        $postViewHeader,
        $postViewContents,
      );
    })
    .catch((error) => {
      $postView.append(document.createTextNode(error));
    });

  return $postView;
};

export default PostView;

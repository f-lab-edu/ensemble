import { createElement } from '../utils/util';
import { getData } from '../../api/firebase';

const PostView = () => {
  const $postView = createElement('div');
  const id = window.location.pathname.split('/')[2];
  const TIME_ZONE = 9 * 60 * 60 * 1000;

  getData(id)
    .then((post) => {
      const {
        title, contents, writer, contentDate,
      } = post.data();
      const createDate = new Date(contentDate.toDate());
      const $postViewHeader = createElement('div', '', 'post-view-header');
      const $postViewTitle = createElement('h1', `${title}`, 'post-view-title');
      const $postViewSubTitle = createElement(
        'div',
        ` 
          <div>${writer}</div>
          <div>작성일 ${new Date(createDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5)}<div>
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

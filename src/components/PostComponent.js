import { createElement } from '../utils/util';
import { fetchData } from '../../api/firebase';

const Post = () => {
  const $post = createElement('div');
  const $headerSection = localStorage.getItem('user')
    ? createElement(
      'section',
      `
        <p>함께 성장할 스터디를 모집해보세요</p>
        <a href="/postwrite" class="routing">글쓰기</a>
      `,
      'community-header',
    )
    : createElement(
      'section',
      '<p>함께 성장할 스터디를 모집해보세요</p>',
      'community-header',
    );
  const $postSection = createElement('section', '', 'post-list');
  const $ul = createElement('ul');

  fetchData()
    .then((posts) => {
      posts.forEach((post) => {
        const { title, contents } = post.data();
        const $li = createElement(
          'li',
          `
            <a>
              <div class="post-title">${title}</div>
              <div class="post-body">${contents}</div>
            </a>
          `,
          'post-container',
        );
        $ul.append($li);
      });
      $postSection.append($ul);
      $post.append($headerSection, $postSection);
    })
    .catch((error) => {
      $post.append(document.createTextNode(error));
    });

  return $post;
};

export default Post;

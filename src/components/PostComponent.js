import selectUser from '../utils/indexedDB';
import { createElement, navigateTo } from '../utils/util';
import { fetchData } from '../../api/firebase';

const handleClickPost = (event, render) => {
  event.preventDefault();

  const path = event.currentTarget.getAttribute('href');
  if (window.location.pathname === path) return;
  navigateTo(path, render);
};

const Post = (render) => {
  const $post = createElement('div');
  const $headerSection = createElement('section', '', 'community-header');
  selectUser()
    .then((user) => {
      $headerSection.innerHTML = user
        ? `
          <p>함께 성장할 스터디를 모집해보세요</p>
          <a href="/postwrite" data-link>글쓰기</a>
        `
        : `
          <p>함께 성장할 스터디를 모집해보세요</p>
        `;
    })
    .catch((error) => {
      $headerSection.innerHTML = `<p>${error}</p>`;
    });
  const $postSection = createElement('section', '', 'post-list');
  const $ul = createElement('ul');

  fetchData()
    .then((posts) => {
      posts.forEach((post) => {
        const { title, contents } = post.data();
        const $li = createElement(
          'li',
          `
            <a href="/postview/${post.id}">
              <div class="post-title">${title}</div>
              <div class="post-body">${contents}</div>
            </a>
          `,
          'post-container',
        );
        const $a = $li.querySelector('a');
        $a.addEventListener('click', (event) => { handleClickPost(event, render); });
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

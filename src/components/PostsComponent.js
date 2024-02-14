import Post from './PostComponent';

import selectUser from '../utils/indexedDB';
import { createElement } from '../utils/util';
import { fetchData } from '../../api/firebase';

const Posts = async (render) => {
  const $posts = createElement('div');
  const $postSection = createElement('section', '', 'post-list');
  const $ul = createElement('ul');

  const posts = await fetchData();
  if (!posts) throw new Error('게시글을 찾을 수 없습니다.');

  posts.forEach((post) => {
    $ul.append(Post(post, render));
  });
  $postSection.append($ul);

  const $communityHeader = createElement('section', '', 'community-header');
  const user = await selectUser();
  if (user) {
    $communityHeader.innerHTML = `
      <p>함께 성장할 스터디를 모집해보세요</p>
      <a href="/post/write" data-link>글쓰기</a>
    `;
    $posts.append($communityHeader, $postSection);
    return $posts;
  }
  $communityHeader.innerHTML = `
    <p>함께 성장할 스터디를 모집해보세요</p>
  `;
  $posts.append($communityHeader, $postSection);
  return $posts;
};

export default Posts;

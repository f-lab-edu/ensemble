import { createElement, navigateTo, isDeadlineDate } from '../utils/util';

const handleClickPost = (event, render) => {
  event.preventDefault();

  const path = event.currentTarget.getAttribute('href');
  navigateTo(path, render);
};

const Post = (post, render) => {
  const {
    title, contents, deadline, applicant, recruitment,
  } = post.data();

  const $post = createElement(
    'li',
    ` 
      <a href="/post/view/${post.id}">
        <div class="post-title">${title}</div>
        <div class="post-body">${contents}</div>
      </a>
    `,
    'post-container',
  );
  const $postContainer = $post.querySelector('a');
  $postContainer.addEventListener('click', (event) => { handleClickPost(event, render); });

  const checkDeadline = isDeadlineDate(deadline.toDate(), applicant, recruitment);
  const $recruitmentStatus = createElement('div', '', 'recruitement-status');

  if (checkDeadline) {
    $recruitmentStatus.innerHTML = '모집완료';
    $recruitmentStatus.classList.add('gray-status');
    $postContainer.prepend($recruitmentStatus);
    return $post;
  }

  $recruitmentStatus.innerHTML = '모집중';
  $recruitmentStatus.classList.add('green-status');
  $postContainer.prepend($recruitmentStatus);
  return $post;
};

export default Post;

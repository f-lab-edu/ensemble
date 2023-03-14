import RecruitmentStatus from './RecruitmentStatusComponent';

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
  const checkDeadline = isDeadlineDate(deadline.toDate(), applicant, recruitment);

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
  $postContainer.prepend(RecruitmentStatus(checkDeadline));

  return $post;
};

export default Post;

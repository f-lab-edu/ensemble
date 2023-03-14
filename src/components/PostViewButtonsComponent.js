import Modal from './ModalComponent';

import { createElement, navigateTo, isApply } from '../utils/util';
import { applyStudy, cancelSutdy } from '../../api/firebase';

const handleClickEdit = (event, render) => {
  event.preventDefault();

  const path = event.target.getAttribute('href');
  navigateTo(path, render);
};

const handleClickDelete = (event, render, postId) => {
  event.preventDefault();

  const $app = document.querySelector('#app');
  $app.append(Modal(render, postId));
};

const handleClickApply = (event, render, postId, applicants, email) => {
  event.preventDefault();

  applyStudy(postId, applicants, email)
    .then(() => {
      render();
    });
};

const handleClickCancel = (event, render, postId, applicants, email) => {
  event.preventDefault();

  cancelSutdy(postId, applicants, email)
    .then(() => {
      render();
    });
};

const PostViewButtons = (render, user, uid, postId, applicants, checkDeadline) => {
  const $postViewButtons = createElement('div', '', 'post-button');
  const checkApply = isApply(applicants, user.value.email);

  if (user.value.uid === uid) {
    $postViewButtons.innerHTML = `
      <a href="/" class="red-btn" id="post-delete-button">삭제</a>
      <a href="/post/edit/${postId}" class="green-btn" id="post-edit-button">수정</a>
    `;
    const $postDeleteButton = $postViewButtons.querySelector('#post-delete-button');
    $postDeleteButton.addEventListener('click', (event) => handleClickDelete(event, render, postId));

    const $postEditButton = $postViewButtons.querySelector('#post-edit-button');
    $postEditButton.addEventListener('click', (event) => handleClickEdit(event, render));
  } else if (!checkDeadline && !checkApply) {
    $postViewButtons.innerHTML = `
      <a class="green-btn" id="post-apply-button">신청</a>
    `;
    const $postApplyButton = $postViewButtons.querySelector('#post-apply-button');
    $postApplyButton.addEventListener('click', (event) => handleClickApply(event, render, postId, applicants, user.value.email));
  } else if (!checkDeadline && checkApply) {
    $postViewButtons.innerHTML = `
      <a class="blue-btn" id="post-apply-cancel">신청 대기중</a>
    `;
    const $postApplyButton = $postViewButtons.querySelector('#post-apply-cancel');
    $postApplyButton.addEventListener('click', (event) => handleClickCancel(event, render, postId, applicants, user.value.email));
  }
  return $postViewButtons;
};

export default PostViewButtons;

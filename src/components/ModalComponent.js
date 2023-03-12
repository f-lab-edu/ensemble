import { createElement, navigateTo } from '../utils/util';
import { deleteData } from '../../api/firebase';

const handleClickCancel = (event) => {
  event.preventDefault();

  const $app = document.querySelector('#app');
  const $modal = document.querySelector('.modal');
  $app.removeChild($modal);
};
const handleClickConfirm = (event, render, postId) => {
  event.preventDefault();

  deleteData(postId)
    .then(() => {
      const path = event.target.getAttribute('href');
      if (window.location.pathname === path) return;
      navigateTo(path, render);
    });
};

const Modal = (render, postId) => {
  const $modal = createElement(
    'div',
    ` 
      <div class="dimmed"></div>
      <div class="modal-container">
        <div class="modal-title">글 삭제</div>
        <div class="modal-content">해당 글을 삭제하시겠습니까?</div>
        <div class="modal-bottom">
          <a id="modal-cancel">취소</a>
          <a href="/" class="green-btn" id="modal-confirm">확인</a>
        </div>
      </div>
    `,
    'modal',
  );
  const $modalCancel = $modal.querySelector('#modal-cancel');
  $modalCancel.addEventListener('click', (event) => handleClickCancel(event));
  const $modalConfirm = $modal.querySelector('#modal-confirm');
  $modalConfirm.addEventListener('click', (event) => handleClickConfirm(event, render, postId));
  return $modal;
};

export default Modal;

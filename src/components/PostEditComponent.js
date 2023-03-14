import { createElement, navigateTo, formatPostDate } from '../utils/util';
import { getData, updateData } from '../../api/firebase';
import selectUser from '../utils/indexedDB';

const handleClickEdit = (event, render, postId) => {
  event.preventDefault();
  const $postTitleEdit = document.querySelector('.post-title-input');
  const $postDateEdit = document.querySelector('.post-date-input');
  const $postContentEdit = document.querySelector('.post-contents-input');
  const $errorMessage = document.querySelector('.error-message');

  const title = $postTitleEdit.value;
  const contents = $postContentEdit.value;
  const date = $postDateEdit.value;

  if (!title) {
    $errorMessage.innerHTML = '제목을 입력해주세요.';
    return;
  }

  if (!contents) {
    $errorMessage.innerHTML = '본문 내용을 작성해주세요.';
    return;
  }

  updateData(postId, title, contents, date)
    .then(() => {
      const path = event.target.getAttribute('href');
      navigateTo(path, render);
    });
};

const handleClickEditCancel = (event, render) => {
  event.preventDefault();

  const path = event.target.getAttribute('href');
  navigateTo(path, render);
};

const PostEdit = async (render) => {
  const $postEdit = createElement('div');
  const postId = window.location.pathname.split('/').slice(-1)[0];

  const today = new Date();
  const post = await getData(postId);
  if (!post.data()) throw new Error('존재하지 않는 게시글입니다.');

  const user = await selectUser();
  const {
    title, contents, deadline, uid,
  } = post.data();
  if (user.value.uid !== uid) throw new Error('접근권한이 없습니다.');

  const $postTitleEdit = createElement(
    'div',
    `
      <input 
        type="text" 
        class="post-title-input" 
        placeholder="제목을 입력해주세요."
        value="${title}"
      />
    `,
  );
  const $postDateEdit = createElement(
    'div',
    `
      마감일: <input 
        type="date"
        class="post-date-input"
        value="${formatPostDate(deadline.toDate())}"
        min="${formatPostDate(today, 1)}"
      />
    `,
  );
  const $postContentEdit = createElement(
    'div',
    `<textarea class="post-contents-input">${contents}</textarea>`,
  );
  const $errorMessage = createElement('div', '', 'error-message');
  const $postEditButtonContainer = createElement(
    'div',
    `
      <a href="/post/view/${postId}" class="post-cancel-button" id="post-edit-cancel">취소</a>
      <a href="/post/view/${postId}" class="green-btn" id="post-edit-button">수정</a>
    `,
    'post-button',
  );
  const $postEditButton = $postEditButtonContainer.querySelector('#post-edit-button');
  $postEditButton.addEventListener('click', (event) => handleClickEdit(event, render, postId));

  const $postEditCancelButton = $postEditButtonContainer.querySelector('#post-edit-cancel');
  $postEditCancelButton.addEventListener('click', (event) => handleClickEditCancel(event, render));

  $postEdit.append(
    $postTitleEdit,
    $postDateEdit,
    $postContentEdit,
    $errorMessage,
    $postEditButtonContainer,
  );

  return $postEdit;
};

export default PostEdit;

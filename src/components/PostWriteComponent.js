import selectUser from '../utils/indexedDB';
import { createElement, formatPostDate } from '../utils/util';
import { setData } from '../../api/firebase';

const handleClickRegisterPost = (event, render) => {
  event.preventDefault();
  const $postTitle = document.querySelector('.post-title-input');
  const $postDate = document.querySelector('.post-date-input');
  const $postContents = document.querySelector('.post-contents-input');
  const $errorMessage = document.querySelector('.error-message');

  const title = $postTitle.value;
  const contents = $postContents.value;
  const date = $postDate.value;

  if (!title) {
    $errorMessage.innerHTML = '제목을 입력해주세요.';
    return;
  }

  if (!contents) {
    $errorMessage.innerHTML = '본문 내용을 작성해주세요.';
    return;
  }

  selectUser()
    .then((user) => {
      setData(title, contents, date, user.value.email, user.value.uid);
    });

  const path = event.target.getAttribute('href');
  if (window.location.pathname === path) return;
  window.history.pushState(null, null, path);
  render(path);
};

const PostWrite = (render) => {
  const today = new Date();

  const $postWrite = createElement('div');
  const $postTitleInput = createElement(
    'div',
    '<input type="text" class="post-title-input" placeholder="제목을 입력해주세요."/>',
  );
  const $postDateInput = createElement(
    'div',
    `
      마감일: <input 
        type="date"
        class="post-date-input"
        value="${formatPostDate(today)}"
        min="${formatPostDate(today, 1)}"
      />
    `,
  );
  const $postContentsInput = createElement(
    'div',
    '<textarea class="post-contents-input" />',
  );
  const $errorMessage = createElement('div', '', 'error-message');
  const $postButton = createElement(
    'div',
    `
      <a href="/" id="post-register-button">등록</a>
      <a href="/" class="post-cancel-button" data-link>취소</a>
    `,
    'post-button',
  );
  const $postRegisterButton = $postButton.querySelector('#post-register-button');
  $postRegisterButton.addEventListener('click', (event) => { handleClickRegisterPost(event, render); });

  $postWrite.append(
    $postTitleInput,
    $postDateInput,
    $postContentsInput,
    $errorMessage,
    $postButton,
  );

  return $postWrite;
};

export default PostWrite;

import createElement from '../util/util';

const PostWrite = () => {
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
        value="${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDay()).toString().padStart(2, '0')}"
        min="${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDay() + 1).toString().padStart(2, '0')}"
      />
    `,
  );
  const $postContentsInput = createElement(
    'div',
    '<textarea class="post-contents-input" />',
  );
  const $postError = createElement('div', '', 'error-message');
  const $postButton = createElement(
    'div',
    `
      <a href="/" class="post-register-button">등록</a>
      <a href="/" class="post-cancel-button router">취소</a>
    `,
    'post-button',
  );

  $postWrite.append(
    $postTitleInput,
    $postDateInput,
    $postContentsInput,
    $postError,
    $postButton,
  );

  return $postWrite;
};

export default PostWrite;

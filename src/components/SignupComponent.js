import { createElement } from '../utils/util';

const Signup = () => {
  const $signup = createElement('form', '', 'user-form');
  const $signupTitle = createElement('h1', '회원가입', 'user-title');
  const $signupEmail = createElement(
    'div',
    `
      <label for="email">이메일</label>
      <input type="email" id="email" placeholder="example@abc.com"/>
    `,
    'user-form-input',
  );
  const $signupPassword = createElement(
    'div',
    `
      <label for="password">비밀번호</label>
      <input type="password" id="password" />
    `,
    'user-form-input',
  );
  const $signupPasswordConfirm = createElement(
    'div',
    `
      <label for="password-confirm">비밀번호 확인</label>
      <input type="password" id="password-confirm" />
    `,
    'user-form-input',
  );
  const $signupError = createElement('div', '', 'error-message');
  const $signupButton = createElement(
    'div',
    `
      <button type="submit">
        <a href="/login" class="signup-button">가입하기</a>
      </button>
    `,
    'user-form-button',
  );

  $signup.append(
    $signupTitle,
    $signupEmail,
    $signupPassword,
    $signupPasswordConfirm,
    $signupError,
    $signupButton,
  );

  return $signup;
};

export default Signup;

import { createElement, authErrorMessage, navigateTo } from '../utils/util';
import { createUser } from '../../api/firebase';

const handleClickSignUp = (event, render) => {
  event.preventDefault();

  const $email = document.querySelector('#email');
  const $password = document.querySelector('#password');
  const $passwordConfirm = document.querySelector('#password-confirm');
  const $errorMessage = document.querySelector('.error-message');

  const email = $email.value;
  const password = $password.value;
  const passwordConfirm = $passwordConfirm.value;

  if (password !== passwordConfirm) {
    $errorMessage.innerHTML = '비밀번호가 서로 일치하지 않습니다';
    return;
  }

  createUser(email, password)
    .then(() => {
      const path = event.target.getAttribute('href');
      navigateTo(path, render);
    })
    .catch((error) => {
      $errorMessage.innerHTML = authErrorMessage[error.code];
    });
};

const Signup = (render) => {
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
  const $signupButtonContainer = createElement(
    'div',
    `
      <button type="submit">
        <a href="/" id="signup-button">가입하기</a>
      </button>
    `,
    'user-form-button',
  );
  const $signupButton = $signupButtonContainer.querySelector('#signup-button');
  $signupButton.addEventListener('click', (event) => { handleClickSignUp(event, render); });

  $signup.append(
    $signupTitle,
    $signupEmail,
    $signupPassword,
    $signupPasswordConfirm,
    $signupError,
    $signupButtonContainer,
  );

  return $signup;
};

export default Signup;

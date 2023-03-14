import { createElement, authErrorMessage, navigateTo } from '../utils/util';
import { signIn } from '../../api/firebase';

const handleClickLogin = (event, render) => {
  event.preventDefault();
  const $email = document.querySelector('#email');
  const $password = document.querySelector('#password');
  const $errorMessage = document.querySelector('.error-message');

  const email = $email.value;
  const password = $password.value;

  signIn(email, password)
    .then(() => {
      const path = event.target.getAttribute('href');
      navigateTo(path, render);
    })
    .catch((error) => {
      $errorMessage.innerHTML = authErrorMessage[error.code];
    });
};

const Login = (render) => {
  const $login = createElement('form', '', 'user-form');
  const $loginTitle = createElement('h1', '로그인', 'user-title');
  const $loginEmail = createElement(
    'div',
    `
      <label for="email">이메일</label>
      <input type="email" id="email" />
    `,
    'user-form-input',
  );
  const $loginPassword = createElement(
    'div',
    `
      <label for="password">비밀번호</label>
      <input type="password" id="password" />
    `,
    'user-form-input',
  );
  const $loginError = createElement('div', '', 'error-message');
  const $loginButtonContainer = createElement(
    'div',
    `
      <button type="submit">
        <a href="/" id="login-button">로그인</a>
      </button>
    `,
    'user-form-button',
  );
  const $loginButton = $loginButtonContainer.querySelector('#login-button');
  $loginButton.addEventListener('click', (event) => { handleClickLogin(event, render); });

  $login.append(
    $loginTitle,
    $loginEmail,
    $loginPassword,
    $loginError,
    $loginButtonContainer,
  );

  return $login;
};

export default Login;

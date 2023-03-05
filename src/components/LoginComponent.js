import createElement from '../util/util';

const Login = () => {
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
  const $loginButton = createElement(
    'div',
    `
      <button type="submit">
        <a href="/" class="login-button">로그인</a>
      </button>
    `,
    'user-form-button',
  );

  $login.append(
    $loginTitle,
    $loginEmail,
    $loginPassword,
    $loginError,
    $loginButton,
  );

  return $login;
};

export default Login;

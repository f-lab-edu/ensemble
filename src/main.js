import Post from './components/PostComponent';
import PostWirte from './components/PostWriteComponent';
import NotFound from './components/NotFoundComponent';
import Signup from './components/SignupComponent';
import Login from './components/LoginComponent';
import { setData, createUser, signIn } from '../api/firebase';

const $app = document.querySelector('#app');
const $navigation = document.querySelector('#navigation');

const authErrorMessage = {
  'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
  'auth/weak-password': '비밀번호를 6자리 이상으로 입력해주세요.',
  'auth/internal-error': '비밀번호를 입력 해 주세요',
  'auth/email-already-in-use': '이미 등록된 이메일입니다.',
  'auth/wrong-password': '이메일또는 비밀번호를 잘못입력하셨습니다.',
  'auth/user-not-found': '이메일또는 비밀번호를 잘못입력하셨습니다.',
};

const routes = [
  { path: '/', component: Post },
  { path: '/postwrite', component: PostWirte },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
];

const render = (path) => {
  const _path = path ?? window.location.pathname;
  try {
    const component = routes.find((route) => route.path === _path)?.component || NotFound;
    $app.replaceChildren(component());
  } catch (error) {
    $app.replaceChildren(NotFound(error));
  }
};

const handleClickRouter = (event) => {
  if (!event.target.classList.contains('router')) return;
  event.preventDefault();
  const path = event.target.getAttribute('href');
  if (window.location.pathname === path) return;
  window.history.pushState(null, null, path);
  render(path);
};

$navigation.addEventListener('click', handleClickRouter);
$app.addEventListener('click', handleClickRouter);
$app.addEventListener('click', (event) => {
  if (event.target.classList.contains('post-register-button')) {
    event.preventDefault();
    const $postTitleInput = document.querySelector('.post-title-input');
    const $postDateInput = document.querySelector('.post-date-input');
    const $postContentsInput = document.querySelector('.post-contents-input');
    const $errorMessage = document.querySelector('.error-message');

    const title = $postTitleInput.value;
    const contents = $postContentsInput.value;
    const date = $postDateInput.value;

    if (!title) {
      $errorMessage.innerHTML = '제목을 입력해주세요.';
      return;
    }

    if (!contents) {
      $errorMessage.innerHTML = '본문 내용을 작성해주세요.';
      return;
    }

    setData(title, contents, date);

    const path = event.target.getAttribute('href');
    if (window.location.pathname === path) return;
    window.history.pushState(null, null, path);
    render(path);
  }

  if (event.target.classList.contains('signup-button')) {
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
        if (window.location.pathname === path) return;
        window.history.pushState(null, null, path);
        render(path);
      })
      .catch((error) => {
        $errorMessage.innerHTML = authErrorMessage[error.code];
      });
  }

  if (event.target.classList.contains('login-button')) {
    event.preventDefault();
    const $email = document.querySelector('#email');
    const $password = document.querySelector('#password');
    const $errorMessage = document.querySelector('.error-message');

    const email = $email.value;
    const password = $password.value;

    signIn(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);

        const path = event.target.getAttribute('href');
        if (window.location.pathname === path) return;
        window.history.pushState(null, null, path);
        render(path);
      })
      .catch((error) => {
        $errorMessage.innerHTML = authErrorMessage[error.code];
      });
  }
});

window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());

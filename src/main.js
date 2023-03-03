import Post from './components/PostComponent';
import PostWirte from './components/PostWriteComponent';
import NotFound from './components/NotFoundComponent';
import { setData } from '../api/firebase';

const $app = document.querySelector('#app');
const $navigation = document.querySelector('#navigation');

const routes = [
  { path: '/', component: Post },
  { path: '/postwrite', component: PostWirte },
  // { path: '/login', component: Login },
  // { path: '/register', component: Register },
];

const render = (path) => {
  const _path = path ?? window.location.pathname;
  try {
    const component = routes.find((route) => route.path === _path)?.component || NotFound;
    $app.replaceChildren(component());
  } catch (error) {
    $app.replaceChildren(NotFound());
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
    const $postError = document.querySelector('.post-error');

    const title = $postTitleInput.value;
    const contents = $postContentsInput.value;
    const date = $postDateInput.value;

    if (!title) {
      $postError.innerHTML = '제목을 입력해주세요.';
      return;
    }

    if (!contents) {
      $postError.innerHTML = '본문 내용을 작성해주세요.';
      return;
    }

    setData(title, contents, date);

    const path = event.target.getAttribute('href');
    if (window.location.pathname === path) return;
    window.history.pushState(null, null, path);
    render(path);
  }
});

window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());

import Post from './components/PostComponent';
import PostWirte from './components/PostWriteComponent';
import NotFound from './components/NotFoundComponent';
import { setData } from '../api/firebase';

const $app = document.querySelector('#app');
// const $navigation = document.querySelector('.navigation');

const routes = [
  { path: '', component: Post },
  { path: 'postwrite', component: PostWirte },
  // { path: '/login', component: Login },
  // { path: '/register', component: Register },
];

const render = () => {
  const hash = window.location.hash.replace('#', '');
  // const _path = path ?? window.location.pathname;

  try {
    const component = routes.find((route) => route.path === hash)?.component || NotFound;
    $app.replaceChildren(component());
  } catch (error) {
    $app.replaceChildren(document.createTextNode(error));
  }
};

// const handleClickRouter = (event) => {
//   if (!event.target.classList.contains('router')) return;
//   event.preventDefault();
//   const path = event.target.getAttribute('href');
//   if (window.location.pathname === path) return;
//   window.history.pushState(null, null, path);
//   render(path);
// };

// $navigation.addEventListener('click', handleClickRouter);
// $app.addEventListener('click', handleClickRouter);
$app.addEventListener('click', (event) => {
  if (event.target.classList.contains('post-register-button')) {
    const $postTitleInput = document.querySelector('.post-title-input');
    const $postDateInput = document.querySelector('.post-date-input');
    const $postContentsInput = document.querySelector('.post-contents-input');

    setData($postTitleInput.value, $postContentsInput.value, $postDateInput.value);
  }
});

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

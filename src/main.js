import Header from './components/HeaderComponent';
import Post from './components/PostComponent';
import PostWrite from './components/PostWriteComponent';
import NotFound from './components/NotFoundComponent';
import Signup from './components/SignupComponent';
import Login from './components/LoginComponent';

import { createElement } from './utils/util';

const $app = document.querySelector('#app');

const routes = [
  { path: '/', component: Post },
  { path: '/postwrite', component: PostWrite },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
];

const render = async (path) => {
  const _path = path ?? window.location.pathname;
  try {
    const $header = await Header(render);
    const $main = createElement('main');
    const component = routes.find((route) => route.path === _path)?.component || NotFound;
    $main.append(component(render));

    $app.replaceChildren($header, $main);
  } catch (error) {
    $app.replaceChildren(NotFound(error));
  }
};

const handleClickRouter = (event) => {
  if (!event.target.matches('[data-link]')) return;

  const path = event.target.getAttribute('href');
  if (window.location.pathname === path) return;
  window.history.pushState(null, null, path);
  render(path);
};

$app.addEventListener('click', handleClickRouter);
window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());

import Header from './components/HeaderComponent';
import Post from './components/PostComponent';
import PostWirte from './components/PostWriteComponent';
import NotFound from './components/NotFoundComponent';
import Signup from './components/SignupComponent';
import Login from './components/LoginComponent';

import { createElement, handleClickApp } from './utils/util';

const $app = document.querySelector('#app');

const routes = [
  { path: '/', component: Post },
  { path: '/postwrite', component: PostWirte },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
];

const render = (path) => {
  const _path = path ?? window.location.pathname;
  try {
    const $header = Header();
    const $main = createElement('main');
    const component = routes.find((route) => route.path === _path)?.component || NotFound;
    $main.append(component());

    $app.replaceChildren($header, $main);
  } catch (error) {
    $app.replaceChildren(NotFound(error));
  }
};

$app.addEventListener('click', (event) => {
  Object.entries(handleClickApp).forEach(([className, handler]) => {
    if (event.target.classList.contains(className)) handler(event, render);
  });
});

window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());

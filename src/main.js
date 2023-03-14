import Header from './components/HeaderComponent';
import Post from './components/PostsComponent';
import PostWrite from './components/PostWriteComponent';
import PostView from './components/PostViewComponent';
import PostEdit from './components/PostEditComponent';
import NotFound from './components/NotFoundComponent';
import Signup from './components/SignupComponent';
import Login from './components/LoginComponent';

import '../main.css';

import { createElement, navigateTo } from './utils/util';

const $app = document.querySelector('#app');
const BASE_URL = '/ensemble';
const postIdRegExp = /\/\w{20}/g;

const routes = [
  { path: '/', component: Post },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/post/view', component: PostView },
  { path: '/post/write', component: PostWrite },
  { path: '/post/edit', component: PostEdit },
];

const render = async (path) => {
  const _path = path ?? window.location.pathname.replace(BASE_URL, '');
  try {
    const $header = await Header(render);
    const $main = createElement('main');
    const component = routes.find((route) => route.path === _path.replace(postIdRegExp, ''))?.component;
    if (!component) throw Error('유효하지 않은 URL입니다');

    $main.append(await component(render));
    $app.replaceChildren($header, $main);
  } catch (error) {
    $app.replaceChildren(NotFound(render, error));
  }
};

const handleClickRouter = (event) => {
  if (!event.target.matches('[data-link]')) return;
  event.preventDefault();

  const path = event.target.getAttribute('href');
  if (window.location.pathname === path) return;
  navigateTo(path, render);
};

$app.addEventListener('click', handleClickRouter);
window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());

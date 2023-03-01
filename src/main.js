import Post from './components/PostComponent';

const $app = document.querySelector('#app');

const routes = [
  { path: '/', component: Post },
  // { path: '/login', component: Login },
  // { path: '/register', component: Register },
];

const render = (path) => {
  try {
    const component = routes.find((route) => route.path === path)?.component;
    $app.replaceChildren(component());
  } catch (error) {
    $app.replaceChildren(document.createTextNode(error));
  }
};

window.addEventListener('DOMContentLoaded', () => render('/'));

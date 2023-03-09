import selectUser from '../utils/indexedDB';
import { createElement, navigateTo } from '../utils/util';
import { logout } from '../../api/firebase';

const handleClickLogout = (event, render) => {
  event.preventDefault();
  logout();

  const path = event.target.getAttribute('href');
  navigateTo(path, render);
};

const Header = async (render) => {
  const $header = createElement('header');
  const $title = createElement(
    'div',
    '<a href="/" class="title" data-link>ensemble</a>',
  );
  const $navigation = createElement('nav', '', 'navigation');
  const user = await selectUser();
  if (user) {
    $navigation.innerHTML = `
      <a href="/users" data-link>마이페이지</a>
      <a href="/" id="logout-button">로그아웃</a>
    `;
    const $logoutButton = $navigation.querySelector('#logout-button');
    $logoutButton.addEventListener('click', (event) => { handleClickLogout(event, render); });
    $header.append($title, $navigation);
    return $header;
  }

  $navigation.innerHTML = `
    <a href="/login" data-link>로그인</a>
    <a href="/signup" data-link>회원가입</a>
  `;

  $header.append($title, $navigation);
  return $header;
};

export default Header;

import selectUser from '../utils/indexedDB';
import { createElement } from '../utils/util';

const Header = () => {
  const $header = createElement('header');
  const $title = createElement(
    'div',
    '<a href="/" class="title routing">ensemble</a>',
  );
  const $navigation = createElement('nav', '', 'navigation');
  selectUser()
    .then((user) => {
      $navigation.innerHTML = user
        ? `
          <a href="/users" class="routing">마이페이지</a>
          <a href="/" class="logout-button">로그아웃</a>
        `
        : `
          <a href="/login" class="routing">로그인</a>
          <a href="/signup" class="routing">회원가입</a>
        `;
    })
    .catch((error) => {
      $navigation.innerHTML = `<p>${error}</p>`;
    });

  $header.append($title, $navigation);

  return $header;
};

export default Header;

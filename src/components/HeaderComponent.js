import { createElement } from '../utils/util';

const Header = () => {
  const $header = createElement('header');
  const $title = createElement(
    'div',
    '<a href="/" class="title routing">ensemble</a>',
  );
  const $navigation = localStorage.getItem('user')
    ? createElement(
      'nav',
      `
        <a href="/users" class="routing">마이페이지</a>
        <a href="/" class="logout-button">로그아웃</a>
      `,
      'navigation',
    )
    : createElement(
      'nav',
      `
        <a href="/login" class="routing">로그인</a>
        <a href="/signup" class="routing">회원가입</a>
      `,
      'navigation',
    );

  $header.append($title, $navigation);

  return $header;
};

export default Header;

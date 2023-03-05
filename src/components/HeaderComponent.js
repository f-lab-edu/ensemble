import createElement from '../util/util';

const Header = () => {
  const $header = createElement('header');
  const $title = createElement(
    'div',
    '<a href="/" class="title" data-link>ensemble</a>',
  );
  const $navigation = localStorage.getItem('user')
    ? createElement(
      'nav',
      `
        <a href="/users" data-link>마이페이지</a>
        <a href="/" data-link>로그아웃</a>
      `,
      'navigation',
    )
    : createElement(
      'nav',
      `
        <a href="/login" data-link>로그인</a>
        <a href="/signup" data-link>회원가입</a>
      `,
      'navigation',
    );

  $header.append($title, $navigation);

  return $header;
};

export default Header;

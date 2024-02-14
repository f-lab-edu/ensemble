import ProfileModal from './ProfileModalComponent';

import selectUser from '../utils/indexedDB';
import { createElement } from '../utils/util';
import svg from '../assets/user.svg';

const handleMouseoverProfile = (event) => {
  const $profileModal = event.currentTarget.querySelector('.profile-modal');
  $profileModal.classList.add('active');
};

const handleMouseoutProfile = (event) => {
  const $profileModal = event.currentTarget.querySelector('.profile-modal');
  $profileModal.classList.remove('active');
};

const Header = async (render) => {
  const $header = createElement('header');
  const $title = createElement(
    'div',
    '<a href="/" class="title" data-link>Ensemble</a>',
  );
  const $navigation = createElement('nav', '', 'navigation');
  const user = await selectUser();
  if (user) {
    $navigation.innerHTML = `
      <div class="navigation-container">
        <a href="/users" data-link class="user-profile">${svg}</a>
      </div>
    `;
    const $userProfile = $navigation.querySelector('.navigation-container');
    $userProfile.append(ProfileModal(render));

    $navigation.addEventListener('mouseover', handleMouseoverProfile);
    $navigation.addEventListener('mouseout', handleMouseoutProfile);

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

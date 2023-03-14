import { createElement, navigateTo } from '../utils/util';
import { logout } from '../../api/firebase';

const handleClickLogout = (event, render) => {
  event.preventDefault();
  logout();

  const path = event.target.getAttribute('href');
  navigateTo(path, render);
};

const ProfileModal = (render) => {
  const $profileModal = createElement(
    'div',
    '<a href="/" id="logout-button">로그아웃</a>',
    'profile-modal',
  );
  const $logoutButton = $profileModal.querySelector('#logout-button');
  $logoutButton.addEventListener('click', (event) => { handleClickLogout(event, render); });
  return $profileModal;
};

export default ProfileModal;

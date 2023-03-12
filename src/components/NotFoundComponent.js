import { createElement, navigateTo } from '../utils/util';

const handleClickHome = (event, render) => {
  event.preventDefault();

  const path = event.target.getAttribute('href');
  navigateTo(path, render);
};

const NotFound = (render, errorMessage) => {
  const $notFound = createElement(
    'div',
    `
      <h1>Not Found</h1>
      <div>${errorMessage ?? ''}</div>      
      <div class="not-found-button">
        <a href="/" class="green-btn" id="home-button">홈으로</a>
      </div>
    `,
    'not-found-container',
  );
  const $homeButton = $notFound.querySelector('#home-button');
  $homeButton.addEventListener('click', (event) => { handleClickHome(event, render); });

  return $notFound;
};

export default NotFound;

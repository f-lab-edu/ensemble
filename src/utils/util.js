import {
  setData, createUser, signIn, logout,
} from '../../api/firebase';

const authErrorMessage = {
  'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
  'auth/weak-password': '비밀번호를 6자리 이상으로 입력해주세요.',
  'auth/internal-error': '비밀번호를 입력 해 주세요',
  'auth/email-already-in-use': '이미 등록된 이메일입니다.',
  'auth/wrong-password': '이메일또는 비밀번호를 잘못입력하셨습니다.',
  'auth/user-not-found': '이메일또는 비밀번호를 잘못입력하셨습니다.',
};

const createElement = (tagName, innerHTML, className) => {
  const $elemet = document.createElement(tagName);
  if (innerHTML) $elemet.innerHTML = innerHTML;
  if (className) $elemet.className = className;
  return $elemet;
};

const formatPostDate = (date, number) => {
  const fostDate = number
    ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate() + number).toString().padStart(2, '0')}`
    : `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;

  return fostDate;
};

const handleClickApp = {
  routing: (event, render) => {
    event.preventDefault();

    const path = event.target.getAttribute('href');
    if (window.location.pathname === path) return;
    window.history.pushState(null, null, path);
    render(path);
  },
  'post-register-button': (event, render) => {
    event.preventDefault();
    const $postTitleInput = document.querySelector('.post-title-input');
    const $postDateInput = document.querySelector('.post-date-input');
    const $postContentsInput = document.querySelector('.post-contents-input');
    const $errorMessage = document.querySelector('.error-message');

    const title = $postTitleInput.value;
    const contents = $postContentsInput.value;
    const date = $postDateInput.value;

    if (!title) {
      $errorMessage.innerHTML = '제목을 입력해주세요.';
      return;
    }

    if (!contents) {
      $errorMessage.innerHTML = '본문 내용을 작성해주세요.';
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    setData(title, contents, date, user.uid);

    const path = event.target.getAttribute('href');
    if (window.location.pathname === path) return;
    window.history.pushState(null, null, path);
    render(path);
  },
  'signup-button': (event, render) => {
    event.preventDefault();
    const $email = document.querySelector('#email');
    const $password = document.querySelector('#password');
    const $passwordConfirm = document.querySelector('#password-confirm');
    const $errorMessage = document.querySelector('.error-message');

    const email = $email.value;
    const password = $password.value;
    const passwordConfirm = $passwordConfirm.value;

    if (password !== passwordConfirm) {
      $errorMessage.innerHTML = '비밀번호가 서로 일치하지 않습니다';
      return;
    }

    createUser(email, password)
      .then(() => {
        const path = event.target.getAttribute('href');
        if (window.location.pathname === path) return;
        window.history.pushState(null, null, path);
        render(path);
      })
      .catch((error) => {
        $errorMessage.innerHTML = authErrorMessage[error.code];
      });
  },
  'login-button': (event, render) => {
    event.preventDefault();
    const $email = document.querySelector('#email');
    const $password = document.querySelector('#password');
    const $errorMessage = document.querySelector('.error-message');

    const email = $email.value;
    const password = $password.value;

    signIn(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        localStorage.setItem('user', JSON.stringify(user));

        const path = event.target.getAttribute('href');
        if (window.location.pathname === path) return;
        window.history.pushState(null, null, path);
        render(path);
      })
      .catch((error) => {
        $errorMessage.innerHTML = authErrorMessage[error.code];
      });
  },
  'logout-button': (event, render) => {
    event.preventDefault();
    logout()
      .then(() => {
        localStorage.removeItem('user');

        const path = event.target.getAttribute('href');
        window.history.pushState(null, null, path);
        render(path);
      })
      .catch((error) => {
        alert(`로그아웃에 실패하셨습니다.${error.code}`);
      });
  },
};

export {
  createElement,
  formatPostDate,
  handleClickApp,
};

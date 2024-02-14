const authErrorMessage = {
  'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
  'auth/weak-password': '비밀번호를 6자리 이상으로 입력해주세요.',
  'auth/internal-error': '비밀번호를 입력 해 주세요',
  'auth/email-already-in-use': '이미 등록된 이메일입니다.',
  'auth/wrong-password': '이메일또는 비밀번호를 잘못입력하셨습니다.',
  'auth/user-not-found': '이메일또는 비밀번호를 잘못입력하셨습니다.',
};

const today = new Date();

const isProductionMode = window.location.host === 'f-lab-edu.github.io';

const isApply = (applicants, email) => applicants.some((applicant) => applicant.email === email);

const isDeadlineDate = (date, applicant, recruitment) => {
  if (today > date) return true;
  if (applicant === recruitment || applicant > recruitment) return true;
  return false;
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

const KR_TIME_ZONE_DIFF = 9 * 60 * 60 * 1000;

const formatPostCreateDate = (date) => new Date(date.getTime() + KR_TIME_ZONE_DIFF).toISOString().replace('T', ' ').slice(0, -5);

const navigateTo = (path, render) => {
  if (isProductionMode) {
    window.history.pushState(null, null, `/ensemble${path}`);
    render(path);
    return;
  }
  window.history.pushState(null, null, path);
  render(path);
};

export {
  createElement,
  formatPostDate,
  formatPostCreateDate,
  authErrorMessage,
  navigateTo,
  isDeadlineDate,
  isApply,
};

import { createElement } from '../utils/util';

const RecruitmentStatus = (checkDeadline) => {
  const $recruitmentStatus = createElement('div', '', 'recruitement-status');

  if (checkDeadline) {
    $recruitmentStatus.innerHTML = '모집완료';
    $recruitmentStatus.classList.add('gray-status');
    return $recruitmentStatus;
  }

  $recruitmentStatus.innerHTML = '모집중';
  $recruitmentStatus.classList.add('green-status');
  return $recruitmentStatus;
};

export default RecruitmentStatus;

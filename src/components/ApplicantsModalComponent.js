import { acceptApplicant, cancelApplicant } from '../../api/firebase';
import { createElement } from '../utils/util';

const handleClickClose = (event) => {
  event.preventDefault();

  const $modal = document.querySelector('.modal');
  document.body.removeChild($modal);
};

const handleClickAccept = (event, render, postId, email, applicantStatus) => {
  event.preventDefault();
  const $target = event.currentTarget.parentNode;
  acceptApplicant(postId, email)
    .then(() => {
      $target.replaceChildren(applicantStatus.accept(render, postId, email));
      const $email = createElement('div', `${email}`);
      $target.prepend($email);

      render();
    });
};

const handleClickCancel = (event, render, postId, email, applicantStatus) => {
  event.preventDefault();
  const $target = event.currentTarget.parentNode;
  cancelApplicant(postId, email)
    .then(() => {
      $target.replaceChildren(applicantStatus.pending(render, postId, email));
      const $email = createElement('div', `${email}`);
      $target.prepend($email);

      render();
    });
};

const applicantStatus = {
  pending: (render, postId, email) => {
    const $applicant = createElement('a', '수락', 'green-btn');
    $applicant.addEventListener(
      'click',
      (event) => handleClickAccept(event, render, postId, email, applicantStatus),
    );

    return $applicant;
  },
  accept: (render, postId, email) => {
    const $applicant = createElement('a', '취소', 'red-btn');
    $applicant.addEventListener(
      'click',
      (event) => handleClickCancel(event, render, postId, email, applicantStatus),
    );

    return $applicant;
  },
};

const ApplicantsModal = (render, postId, applicants) => {
  const $applicantsModal = createElement(
    'div',
    `
      <div class="dimmed"></div>
      <div class="applicants-container">
        <div class="modal-title">신청자 리스트</div>
        <div class="modal-content"></div>
        <div class="modal-bottom">
            <a id="modal-cancel">닫기</a>
        </div>
      </div>
    `,
    'modal',
  );
  const $modalClose = $applicantsModal.querySelector('#modal-cancel');
  $modalClose.addEventListener('click', (event) => handleClickClose(event));
  const $modalContent = $applicantsModal.querySelector('.modal-content');
  applicants.forEach((applicant) => {
    const $applicant = createElement('div', `<div>${applicant.email}</div>`, 'applicant');
    $applicant.append(
      applicantStatus[applicant.status](render, postId, applicant.email),
    );
    $modalContent.append($applicant);
  });

  return $applicantsModal;
};

export default ApplicantsModal;

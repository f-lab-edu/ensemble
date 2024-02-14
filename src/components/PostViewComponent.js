import PostViewButtons from './PostViewButtonsComponent';
import RecruitmentStatus from './RecruitmentStatusComponent';
import ApplicantsModal from './ApplicantsModalComponent';

import {
  createElement, formatPostCreateDate, isDeadlineDate,
} from '../utils/util';
import { getData } from '../../api/firebase';
import selectUser from '../utils/indexedDB';

const handleClickApplications = (event, render, postId, applicants) => {
  event.preventDefault();

  document.body.append(ApplicantsModal(render, postId, applicants));
};

const PostView = async (render) => {
  const $postView = createElement('div', '', 'post-view');
  const postId = window.location.pathname.split('/').slice(-1)[0];

  const post = await getData(postId);
  if (!post.data()) throw new Error('존재하지 않는 게시글입니다.');

  const {
    title, contents, writer, contentDate, deadline, applicant, recruitment, applicants, uid,
  } = post.data();
  const checkDeadline = isDeadlineDate(deadline.toDate(), applicant, recruitment);
  const $postViewHeader = createElement('div', '', 'post-view-header');
  const $postViewTitle = createElement('h1', `${title}`, 'post-view-title');
  const $postViewSubTitle = createElement(
    'div',
    ` 
      <div>${writer}</div>
      <div>작성일 ${formatPostCreateDate(contentDate.toDate())}<div>
      <div>마감일 ${formatPostCreateDate(deadline.toDate())}<div>
      <div>모집 현황 ${applicant}/${recruitment}</div>
    `,
    'post-view-sub-title',
  );
  $postViewSubTitle.append(RecruitmentStatus(checkDeadline));

  const user = await selectUser();
  if (user && user.value.uid === uid) {
    const $applicationButtons = createElement(
      'div',
      '<a id="applicants-view-button" class="blue-btn">신청 리스트</a>',
      'applications-button',
    );
    const $applicationListButton = $applicationButtons.querySelector('#applicants-view-button');
    $applicationListButton.addEventListener('click', (event) => handleClickApplications(event, render, postId, applicants));
    $postViewSubTitle.append($applicationButtons);
  }

  $postViewHeader.append($postViewTitle, $postViewSubTitle);
  const $postViewContents = createElement(
    'div',
    `
      <hr />
      <div>${contents}</div>
    `,
    'post-view-contents',
  );

  if (user) {
    const $postViewButtonContainer = PostViewButtons(
      render,
      user,
      uid,
      postId,
      applicants,
      checkDeadline,
    );
    $postView.append($postViewHeader, $postViewContents, $postViewButtonContainer);

    return $postView;
  }

  $postView.append($postViewHeader, $postViewContents);

  return $postView;
};

export default PostView;

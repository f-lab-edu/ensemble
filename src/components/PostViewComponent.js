import Modal from './ModalComponent';
import RecruitmentStatus from './RecruitmentStatusComponent';

import {
  createElement, formatPostCreateDate, navigateTo, isDeadlineDate,
} from '../utils/util';
import { getData } from '../../api/firebase';
import selectUser from '../utils/indexedDB';

const handleClickEdit = (event, render) => {
  event.preventDefault();

  const path = event.target.getAttribute('href');
  navigateTo(path, render);
};

const handleClickDelete = (event, render, postId) => {
  event.preventDefault();

  const $app = document.querySelector('#app');
  $app.append(Modal(render, postId));
};

const PostView = async (render) => {
  const $postView = createElement('div', '', 'post-view');
  const postId = window.location.pathname.split('/').slice(-1)[0];

  const post = await getData(postId);
  if (!post.data()) throw new Error('존재하지 않는 게시글입니다.');

  const {
    title, contents, writer, contentDate, deadline, applicant, recruitment, uid,
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

  $postViewHeader.append($postViewTitle, $postViewSubTitle);
  const $postViewContents = createElement(
    'div',
    `
      <hr />
      <div>${contents}</div>
    `,
    'post-view-contents',
  );

  const $postViewButtonContainer = createElement('div', '', 'post-button');
  const user = await selectUser();
  if (user && user.value.uid === uid) {
    $postViewButtonContainer.innerHTML = `
      <a href="/" class="red-btn" id="post-delete-button">삭제</a>
      <a href="/post/edit/${postId}" class="green-btn" id="post-edit-button">수정</a>
    `;
    const $postDeleteButton = $postViewButtonContainer.querySelector('#post-delete-button');
    $postDeleteButton.addEventListener('click', (event) => handleClickDelete(event, render, postId));

    const $postEditButton = $postViewButtonContainer.querySelector('#post-edit-button');
    $postEditButton.addEventListener('click', (event) => handleClickEdit(event, render));
  }

  $postView.append(
    $postViewHeader,
    $postViewContents,
    $postViewButtonContainer,
  );

  return $postView;
};

export default PostView;

import { fetchData } from './api/firebase';

const $postList = document.querySelector('.post-list ul');
fetchData($postList);

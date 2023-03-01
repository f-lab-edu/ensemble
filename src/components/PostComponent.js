import { fetchData } from '../../api/firebase';

const Post = () => {
  const $postList = document.createElement('div');
  $postList.className = 'post-list';
  const $ul = document.createElement('ul');
  fetchData()
    .then((posts) => {
      posts.forEach((post) => {
        const { title, contents } = post.data();
        const $li = document.createElement('li');
        $li.className = 'post-container';
        $li.innerHTML = `
            <a>
              <div class="post-title">${title}</div>
              <div class="post-body">${contents}</div>
            </a>
          `;
        $ul.appendChild($li);
      });
      $postList.appendChild($ul);
    })
    .catch((error) => {
      $postList.appendChild(document.createTextNode(error));
    });
  return $postList;
};

export default Post;

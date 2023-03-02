import { fetchData } from '../../api/firebase';

const Post = () => {
  const $post = document.createElement('div');
  const $headerSection = document.createElement('section');
  $headerSection.className = 'community-header';
  $headerSection.innerHTML = `
    <p>함께 성장할 스터디를 모집해보세요</p>
    <a href="#postwrite" class="router">글쓰기</a>
  `;
  const $postSection = document.createElement('section');
  $postSection.className = 'post-list';
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
        $ul.append($li);
      });
      $postSection.append($ul);
      $post.append($headerSection, $postSection);
    })
    .catch((error) => {
      $post.append(document.createTextNode(error));
    });
  return $post;
};

export default Post;

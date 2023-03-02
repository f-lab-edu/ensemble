const PostWrite = () => {
  const $postWrite = document.createElement('div');
  const $titleInput = document.createElement('div');
  const today = new Date();
  $titleInput.innerHTML = `
    <input type="text" class="post-title-input" placeholder="제목을 입력해주세요."/>
  `;
  const $dateInput = document.createElement('div');
  $dateInput.innerHTML = `
    마감일: <input 
      type="date"
      class="post-date-input"
      value="${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDay()).toString().padStart(2, '0')}"
      min="${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDay() + 1).toString().padStart(2, '0')}"
    />
  `;
  const $contentsInput = document.createElement('div');
  $contentsInput.innerHTML = '<textarea class="post-contents-input" />';

  const $postButton = document.createElement('div');
  $postButton.className = 'post-button';
  $postButton.innerHTML = `
    <a href="#" class="post-register-button">등록</a>
    <a href="#" class="post-cancel-button">취소</a>
  `;

  $postWrite.append($titleInput, $dateInput, $contentsInput, $postButton);
  return $postWrite;
};

export default PostWrite;

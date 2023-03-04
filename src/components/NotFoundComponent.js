const NotFound = (errorMessage) => {
  const $p = document.createElement('p');
  $p.innerHTML = `
    <h1>Not Found</h1>
  `;
  if (errorMessage) $p.append(document.createTextNode('errorMessage'));

  return $p;
};

export default NotFound;

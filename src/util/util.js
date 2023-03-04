const createElement = (tagName, innerHTML, className) => {
  const $elemet = document.createElement(tagName);
  if (innerHTML) $elemet.innerHTML = innerHTML;
  if (className) $elemet.className = className;
  return $elemet;
};

export default createElement;

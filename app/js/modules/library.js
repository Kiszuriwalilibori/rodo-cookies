module.exports = {
  createElement: function createElement(tag, classy, innerText) {
    element = document.createElement(tag);
    element.classList.add(classy);
    element.innerText = innerText ? innerText : null;
    return element;
  },
};

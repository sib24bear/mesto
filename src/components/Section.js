export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(initialArray) {
    initialArray.forEach(item => this.appendItem(item));
  }

  setLike(data, LikeCounter) {
    LikeCounter.textContent = data.likes.length;
  }

  deleteItem(element) {
    element.remove();
  }

  appendItem(element) {
    const card = this._renderer(element);
    this._container.append(card);
  }

  prependItem(element) {
    const card = this._renderer(element);
    this._container.prepend(card);
  }
}
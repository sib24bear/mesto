export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach(item => this.appendItem(item));
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
export default class UserInfo {
  constructor({userNameSelector, userAboutSelector, userProfileImageSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userImage = document.querySelector(userProfileImageSelector);
    this._userId = null;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent
    }
  }

  setUserInfo({name, about, imageLink}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userImage.src = imageLink;
  }

  getUserId() {
    return this._userId;
  }

  setUserId(value) {
    this._userId = value;
  }
}
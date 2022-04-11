(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._options=e}var n,r;return n=t,(r=[{key:"_checkResponse",value:function(e){if(e.ok)return e.json();Promise.reject(e.status)}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._options.baseUrl,"/cards"),{headers:this._options.headers}).then((function(t){return e._checkResponse(t)}))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._options.baseUrl,"/users/me"),{headers:this._options.headers}).then((function(t){return e._checkResponse(t)}))}},{key:"setUserInfo",value:function(e,t){var n=this;return fetch("".concat(this._options.baseUrl,"/users/me"),{method:"PATCH",headers:this._options.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return n._checkResponse(e)}))}},{key:"setNewUserCard",value:function(e,t){var n=this;return fetch("".concat(this._options.baseUrl,"/cards"),{method:"POST",headers:this._options.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return n._checkResponse(e)}))}},{key:"getUserCard",value:function(){var e=this;return fetch("".concat(this._options.baseUrl,"/cards"),{headers:this._options.headers}).then((function(t){return e._checkResponse(t)}))}},{key:"deleteUserCard",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._options.headers}).then((function(e){return t._checkResponse(e)}))}},{key:"putLikeCard",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._options.headers}).then((function(e){return t._checkResponse(e)}))}},{key:"deleteLikeCard",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._options.headers}).then((function(e){return t._checkResponse(e)}))}},{key:"setUserAvatar",value:function(e){var t=this;return fetch("".concat(this._options.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._options.headers,body:JSON.stringify({avatar:e})}).then((function(e){return t._checkResponse(e)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._placeTitle=t.name,this._placeLink=t.link,this._placeLike=t.likes.length,this._cardId=t._id,this._userId=n,this._ownerId=t.owner._id,this._cardsLikes=t.likes,this._cardSelector=r,this._handleCardClick=o,this._handleDeleteCardClick=i,this._handleLikeCardClick=a,this._element=this._getTemplate(),this._placeCardTitle=this._element.querySelector(".place-card__title"),this._placeCardImg=this._element.querySelector(".place-card__img"),this._placeCardLikeBtn=this._element.querySelector(".button_type_add-like"),this._placeCardLikeCounter=this._element.querySelector(".place-card__like-counter"),this._placeCardDeleteBtn=this._element.querySelector(".button_type_delete")}var t,r;return t=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".gallery__item").cloneNode(!0)}},{key:"_toggleLikeBtn",value:function(){this._placeCardLikeBtn.classList.toggle("place-card__button_active")}},{key:"_checkCardIsLiked",value:function(){var e=this;this._cardsLikes.forEach((function(t){t._id===e._userId&&e._toggleLikeBtn()}))}},{key:"_isLiked",value:function(){return this._placeCardLikeBtn.classList.contains("place-card__button_active")}},{key:"generateCard",value:function(){return this._setEventListeners(),this._placeCardTitle.textContent=this._placeTitle,this._placeCardImg.src=this._placeLink,this._placeCardImg.alt=this._placeTitle,this._userId!==this._ownerId&&this._placeCardDeleteBtn.remove(),this._placeLike&&(this._checkCardIsLiked(),this._placeCardLikeCounter.textContent=this._placeLike),this._element}},{key:"_setEventListeners",value:function(){var e=this;this._placeCardLikeBtn.addEventListener("click",(function(){e._handleLikeCardClick(e)})),this._placeCardDeleteBtn.addEventListener("click",(function(){e._handleDeleteCardClick(e._cardId,e._element)})),this._placeCardImg.addEventListener("click",(function(){e._handleCardClick(e._placeTitle,e._placeLink)}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){return t.appendItem(e)}))}},{key:"deleteItem",value:function(e){e.remove()}},{key:"appendItem",value:function(e){var t=this._renderer(e);this._container.append(t)}},{key:"prependItem",value:function(e){var t=this._renderer(e);this._container.prepend(t)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__close-btn")&&e.close()}))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function h(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._cardImage=t._popup.querySelector(".image-popup__img"),t._cardTitle=t._popup.querySelector(".image-popup__title"),t}return t=a,(n=[{key:"open",value:function(e,t){l(d(a.prototype),"open",this).call(this),this._cardImage.setAttribute("src",t),this._cardImage.setAttribute("alt",e),this._cardTitle.textContent=e}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function g(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._submitForm=t,n._form=n._popup.querySelector(".form"),n._inputList=n._popup.querySelectorAll(".form__input"),n.submitBtn=n._popup.querySelector(".form__submit-btn"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){return t.value=e[t.name]}))}},{key:"save",value:function(e){this.submitBtn.textContent=e}},{key:"setEventListeners",value:function(){var e=this;m(C(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submitForm(e._getInputValues()),e.save("Сохранить...")}))}},{key:"close",value:function(){m(C(a.prototype),"close",this).call(this),this._form.reset()}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(){return L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=I(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},L.apply(this,arguments)}function I(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}function O(e,t){return O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},O(e,t)}function j(e,t){if(t&&("object"===S(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return j(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._form=n._popup.querySelector(".form"),n._submitForm=t,n._cardId=null,n._cardElement=null,n}return t=a,(n=[{key:"getCarId",value:function(e,t){this._cardId=e,this._cardElement=t}},{key:"getCardElement",value:function(){return this._cardElement}},{key:"setEventListeners",value:function(){var e=this;L(P(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submitForm(e._cardId)}))}}])&&E(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var T=function(){function e(t){var n=t.userNameSelector,r=t.userAboutSelector,o=t.userProfileImageSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(n),this._userAbout=document.querySelector(r),this._userImage=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{userName:this._userName.textContent,userAbout:this._userAbout.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about,r=e.imageLink;this._userName.textContent=t,this._userAbout.textContent=n,this._userImage.src=r}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._form=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._errorIdSuffix=t.errorIdSuffix,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._submitButton=this._formElement.querySelector(this._submitButtonSelector)}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id).concat(this._errorIdSuffix));e.classList.add(this._errorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id).concat(this._errorIdSuffix));e.classList.remove(this._errorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1)}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"setInitialState",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)})),this._toggleButtonState()}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var x,D=document.querySelector(".page"),N=D.querySelector(".button_type_edit-profile"),V=D.querySelector(".profile__avatar"),F=D.querySelector(".button_type_add-card"),J={};function H(e,t){Y.open(e,t)}function M(e,t){Z.getCarId(e,t),Z.open()}function z(e){e._isLiked()?$.deleteLikeCard(e._cardId).then((function(t){e._placeCardLikeCounter.textContent=t.likes.length,e._toggleLikeBtn()})):$.putLikeCard(e._cardId).then((function(t){e._placeCardLikeCounter.textContent=t.likes.length,e._toggleLikeBtn()}))}var $=new t({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-39",headers:{authorization:"aa08a5c7-e07f-468e-8cd4-6dfa046b35da","Content-Type":"application/json"}});Promise.all([$.getUserInfo(),$.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];x=o._id,K.setUserInfo({name:o.name,about:o.about,imageLink:o.avatar}),Q.renderItems(i)})).catch((function(e){console.log(e)}));var G,K=new T({userNameSelector:".profile__name",userAboutSelector:".profile__description",userProfileImageSelector:".profile__avatar-img"}),Q=new i({renderer:function(e){return new r(e,x,"#gallery__item_template",H,M,z).generateCard()}},".gallery__list");G={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit-btn",inactiveButtonClass:"form__submit-btn_disable",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active",errorIdSuffix:"-error"},Array.from(document.querySelectorAll(G.formSelector)).forEach((function(e){var t=new q(G,e),n=e.getAttribute("name");J[n]=t,t.enableValidation()}));var W=new w(".popup_edit-profile",(function(e){$.setUserInfo(e.userName,e.userAbout).then((function(e){K.setUserInfo({name:e.name,about:e.about,imageLink:e.avatar}),W.close()})).finally((function(){W.save("Сохранить")})).catch((function(e){console.log(e)}))}));W.setEventListeners();var X=new w(".popup_add-place",(function(e){$.setNewUserCard(e.name,e.link).then((function(e){Q.prependItem(e),X.close()})).finally((function(){X.save("Создать")})).catch((function(e){console.log(e)}))}));X.setEventListeners();var Y=new _(".image-popup");Y.setEventListeners();var Z=new R(".confirm-popup",(function(e){$.deleteUserCard(e).then((function(){Q.deleteItem(Z.getCardElement()),Z.close()})).catch((function(e){console.log(e)}))}));Z.setEventListeners();var ee=new w(".popup_profile-photo",(function(e){$.setUserAvatar(e.avatar).then((function(e){K.setUserInfo({name:e.name,about:e.about,imageLink:e.avatar}),ee.close()})).finally((function(){ee.save("Обновить")})).catch((function(e){console.log(e)}))}));ee.setEventListeners(),N.addEventListener("click",(function(){W.setInputValues(K.getUserInfo()),J.editProfileForm.setInitialState(),W.open()})),F.addEventListener("click",(function(){J.addPlaceForm.setInitialState(),X.open()})),V.addEventListener("click",(function(){J.editAvatar.setInitialState(),ee.open()}))})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { MyModal } = require("./modules/modal");
const {fetchData} = require('./modules/fetchData');
const { cookies } = require("./modules/cookies");
const {cookieName, URL} = require("./modules/fixtures");

const VisitedRecently = !!cookies.get(cookieName);

!VisitedRecently && document.addEventListener("DOMContentLoaded", () => {
  if (document.body) {
    
    const myModal = new MyModal(document.body);
    myModal.freezeBodyScroll();
    fetchData(URL, myModal);
  } else {
    console.log("Invalid HTML document: <body> not detected");
  }
});

},{"./modules/cookies":2,"./modules/fetchData":3,"./modules/fixtures":4,"./modules/modal":7}],2:[function(require,module,exports){

module.exports = {
cookies:class cookies{

static set(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  const stringifiedValue =JSON.stringify(cvalue);
  document.cookie = cname + "=" + stringifiedValue + ";" + expires;
}

static  get(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

}
}
},{}],3:[function(require,module,exports){
const {handleButtonClick} = require('./handleButtonClick');

module.exports = {
  fetchData: function fetchData(url, node) {
    fetch(url)
      .then(resp => resp.json())
      .then(function (data) {
        const results = Object.entries(data.vendors);
        const vendors = results.map(item => item[1]);
        node.showVendors(vendors);
        node.mountHandlers(() => handleButtonClick(node));
      })
      .catch(function () {
        console.log("error from fetch");
      });
  },
};

},{"./handleButtonClick":5}],4:[function(require,module,exports){

module.exports = {
    cookieName: 'Optadd360_test_cookie_for_Piotr_Maksymiuk',
    URL: "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json"
}


},{}],5:[function(require,module,exports){
const { cookies } = require("./cookies");
const {cookieName} =require("./fixtures");


module.exports = {
  handleButtonClick: function handleButtonClick(arg) {
    return function (event) {
      try {
        const parcel = { status: event.target.textContent, data: arg.getFormData };
        cookies.set(cookieName, parcel, 1);
        arg.unfreezeBodyScroll();
        arg.unBlurBackground();
        arg.unmountModal();
      } catch (err) {
        console.log("error in hendleButtonClick", err);
      }
    };
  },
};

},{"./cookies":2,"./fixtures":4}],6:[function(require,module,exports){
module.exports = {
  createElement: function createElement(tag, classy, innerText) {
    element = document.createElement(tag);
    element.classList.add(classy);
    element.innerText = innerText ? innerText : null;
    return element;
  },
};

},{}],7:[function(require,module,exports){
const { createElement } = require("./library");

module.exports = {
  MyModal: class MyModal {
    constructor(node) {
      this.body = node;
      this.blurBackground();
      this.createModal(this.body);
    }

    createModal(node) {
      try {
        const modal = createElement("div", "modal");
        const buttons = createElement("div", "modal__buttons");
        modal.appendChild(buttons);
        buttons.appendChild(createElement("button", "modal__button", "Accept"));
        buttons.appendChild(createElement("button", "modal__button", "Reject"));
        modal.appendChild(createElement("h1", "modal__h1", "GDPR Consent"));
        const form = createElement("form", "form");
        modal.appendChild(form);
        node.insertBefore(modal, document.body.firstChild);
        this.Modal = modal;
      } catch (err) {
        "error in createModal", err;
      }
    }

    unmountModal() {
      this.body.removeChild(this.Modal);
    }

    showVendors(ary) {
      try {
        ary.forEach(item => {
          const formInput = createElement("input", "form__input");
          const formLabel = createElement("label", "form__label", item.name);
          const formLink = createElement("a", "form__link", "link to policy");
          formLink.setAttribute("href", item.policyUrl);
          formInput.setAttribute("type", "checkbox");
          formInput.setAttribute("ID", item.name);
          formLabel.setAttribute("for", item.name);
          const form = this.Modal.querySelector("form"); //
          form.append(formInput, formLink, formLabel, document.createElement("br"));

          this.Modal.append(form);
        });
      } catch (err) {
        console.log("error in showVendors", err);
      }
    }

    get getFormData() {
      try {
        const checkboxes = Array.prototype.slice.call(this.Modal.querySelectorAll(".form__input"));
        const Inputs = checkboxes.map(item => {
          return { id: item.id, checked: item.checked };
        });

        const checkedInputs = Inputs.filter(item => item.checked);
        return checkedInputs;
      } catch (err) {
        console.log("something is wrong in getFormData function");
        return null;
      }
    }

    get getButtons() {
      return Array.prototype.slice.call(this.Modal.querySelectorAll(".modal__button"));
    }

    mountHandlers(fn) {
      try {
        const buttons = this.getButtons;
        buttons.forEach(item => {
          item.addEventListener("click", fn(this.Modal));
        });
      } catch (err) {
        "error in mountHandlers", err;
      }
    }
    freezeBodyScroll() {
      try {
        this.body.classList.add("frozen-scroll");
      } catch (err) {
        "error in freezeBodyScroll", err;
      }
    }
    unfreezeBodyScroll() {
      try {
        this.body.classList.contains("frozen-scroll") && this.body.classList.remove("frozen-scroll");
      } catch (err) {
        "error in unfreezeBodyScroll", err;
      }
    }

    blurBackground() {
      try {
        const bodyChildNodes = Array.from(this.body.children);
        bodyChildNodes.forEach(node => {
          node.classList.add("blurred");
        });
      } catch (err) {
        console.log("error in blurBackground");
      }
    }

    unBlurBackground() {
      try {
        const bodyDisplayType = this.body.style.display;
        this.body.style.display = "none";
        const bodyChildNodes = Array.from(this.body.children);
        bodyChildNodes.forEach(node => {
          node.classList.remove("blurred");
        });
        this.body.style.display = bodyDisplayType;
      } catch (err) {
        console.log("error in unblurBackground");
      }
    }
  },
};

},{"./library":6}]},{},[1]);

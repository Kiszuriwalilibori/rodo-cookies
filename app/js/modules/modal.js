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

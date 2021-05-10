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

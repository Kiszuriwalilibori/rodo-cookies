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

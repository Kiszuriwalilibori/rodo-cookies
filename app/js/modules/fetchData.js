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

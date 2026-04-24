"option strict";

let meta = {
  blockUI: {
    load: "<h4>Loading...</h4>",
  },
};

$(document).ready(function () {
  try {
    console.log("DOM ready - default.js loaded");

    ErrorHandler.init(window.location.hostname === "localhost");
    throw new Error("Test Error");

  } catch (error) {
    ErrorHandler.handle(e, "$(document).ready");
  }
});

function blockUI(msg) {
  try {
    $.blockUI({
      message: msg || "<h4>Loading...</h4>",
      css: {
        border: "none",
        padding: "15px",
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: "8px",
      },
    });
  } catch (e) {
    ErrorHandler.handle(e, "blockUI");
  }
}

/* Static mock behaviour. No network requests, storage, payment or analytics. */
(function () {
  "use strict";

  var count = 2;
  var counters = document.querySelectorAll("[data-cart-count]");
  var message = document.querySelector("[data-cart-message]");
  var addButton = document.querySelector("[data-add-to-cart]");

  function setCount(value) {
    counters.forEach(function (node) {
      node.textContent = "(" + value + ")";
    });
  }

  document.querySelectorAll(".chip").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".chip").forEach(function (item) {
        item.classList.remove("is-active");
      });
      button.classList.add("is-active");
    });
  });

  document.querySelectorAll(".swatch").forEach(function (button) {
    button.addEventListener("click", function () {
      var group = button.parentElement;
      if (!group) {
        return;
      }
      group.querySelectorAll(".swatch").forEach(function (item) {
        item.classList.remove("is-active");
      });
      button.classList.add("is-active");
    });
  });

  if (addButton) {
    addButton.addEventListener("click", function () {
      count += 1;
      setCount(count);
      addButton.textContent = "Added to mock cart";
      if (message) {
        message.textContent = "Mock cart updated. No order, payment or external request was created.";
      }
    });
  }

  setCount(count);
})();

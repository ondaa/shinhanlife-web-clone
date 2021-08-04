window.onload = function () {
  var header = document.querySelector("header");
  var container = document.querySelector(".container");

  // body 의 scroll에 따라
  document.addEventListener("scroll", function (ev) {
    if (window.pageYOffset > 40) {
      // header 에 fixed 가 추가됨
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
};

window.onload = function () {
  var header = document.querySelector("header");
  var menuSlider = document.querySelector(".menuSlider");

  // body 의 scroll에 따라
  document.addEventListener("scroll", function (ev) {
    if (window.pageYOffset > 40) {
      // header 에 fixed 가 추가됨
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // gnb animation
  var gnbItems = document.querySelectorAll(".navLinkGroup > li");
  var timer = null;

  Array.from(gnbItems).forEach(function (item) {
    item.addEventListener("mouseenter", function (ev) {
      removeOn();

      this.classList.add("on");

      // slider 위치 및 넓이 수정
      var { offsetWidth, offsetLeft } = this.children[0];
      menuSlider.style.left = `${offsetLeft}px`;
      menuSlider.style.width = `${offsetWidth}px`;

      // 350ms 가 지나기 저에 다시 enter 되면 타이머 제거
      clearTimeout(timer);

      if (!header.classList.contains("menuOpen")) {
        header.classList.add("menuOpen");
      }
    });
  });

  header.addEventListener("mouseleave", function () {
    if (header.classList.contains("menuOpen")) {
      // 350ms 후에 실행
      timer = setTimeout(function () {
        menuSlider.style.width = "0px";
        header.classList.remove("menuOpen");
        removeOn();
      }, 350);
    }
  });

  function removeOn() {
    Array.from(gnbItems).forEach(function (item) {
      item.classList.remove("on");
    });
  }
};

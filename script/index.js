window.onload = function () {
  var header = document.querySelector("header");
  var dimmed = document.querySelector(".dimmed");
  var menuSlider = document.querySelector(".menuSlider");

  // 새로고침 해도 sticky 기능 유지
  if (window.pageYOffset > 40) {
    header.classList.add("sticky");
  }

  // body 의 scroll에 따라
  document.addEventListener("scroll", function (ev) {
    if (window.pageYOffset > 40) {
      // header 에 sticky 가 추가됨
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

      // slider 위치 및 넓이 수정
      var { offsetWidth, offsetLeft } = this.children[0];
      menuSlider.style.left = `${offsetLeft}px`;
      menuSlider.style.width = `${offsetWidth}px`;

      // 350ms 가 지나기 저에 다시 enter 되면 타이머 제거
      clearTimeout(timer);

      this.classList.add("on");

      if (!header.classList.contains("menuOpen")) {
        header.classList.add("menuOpen");
        // 뒷배경 보여주기
        dimmed.style.display = "block";
      }
    });
  });

  header.addEventListener("mouseleave", function () {
    if (header.classList.contains("menuOpen")) {
      // 350ms 후에 실행
      timer = setTimeout(function () {
        menuSlider.style.width = "0px";
        header.classList.remove("menuOpen");

        // 뒷배경 숨기기
        dimmed.style.display = "none";
        removeOn();
      }, 350);
    }
  });

  function removeOn() {
    Array.from(gnbItems).forEach(function (item) {
      item.classList.remove("on");
    });
  }

  // footer button evnet
  var footNavOpens = document.querySelectorAll(".footNavOpen");
  var sectionList = document.querySelector(".sectionList");
  var sectionItems = document.querySelectorAll(".sectionItem");
  var keyword = "on";

  var sectionItemsArray = Array.from(sectionItems);

  var heights = sectionItemsArray.map(function (ev) {
    return ev.scrollHeight;
  });

  function max(arr) {
    var maxValue = 0;
    for (let i = 0; i < arr.length; i++) {
      if (maxValue < arr[i]) {
        maxValue = arr[i];
      }
    }

    return maxValue;
  }

  Array.from(footNavOpens).forEach(function (item) {
    item.addEventListener("click", function () {
      var maxHeight = max(heights);

      if (sectionList.classList.contains(keyword)) {
        sectionItemsArray.forEach(function (item) {
          item.style.height = `0px`;
        });

        sectionList.classList.remove(keyword);
      } else {
        sectionItemsArray.forEach(function (item) {
          item.style.height = `${maxHeight + 40}px`;
        });

        sectionList.classList.add(keyword);
      }
    });
  });
};

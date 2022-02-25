let intro = document.querySelector(".splash");
let logoSpan = document.querySelectorAll(".splash-logo");

if (intro && getCookie("visitedBefore")) {
  intro.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  if (intro && !getCookie("visitedBefore")) {
    setCookie("visitedBefore", true, 1);
    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.add("active");
        }, (idx + 1) * 400);
      });
      setTimeout(() => {
        logoSpan.forEach((span, idx) => {
          setTimeout(() => {
            span.classList.remove("active");
            span.classList.add("fade");
          }, (idx + 1) * 50);
        });
      }, 2000);
      setTimeout(() => {
        intro.style.top = "-100vh";
      }, 2400);
    });
  }

  const nav = document.querySelector(".my-nav");
  const logo = document.getElementById("js-imgsrc");
  setMenu();
  window.addEventListener("scroll", function () {
    setMenu();
  });

  const navLinks = document.querySelectorAll(".nav-item:not(.dropdown)");
  const menuToggle = document.getElementById("main-nav");
  const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

  Object.keys(window).forEach((key) => {
    if (/^onclick/.test(key)) {
      window.addEventListener(key.slice(2), (event) => {
        collapseMenu();
      });
    }
  });

  navLinks.forEach((l) => {
    l.addEventListener("click", () => {
      bsCollapse.hide();
    });
  });

  menuToggle.addEventListener("show.bs.collapse", function () {
    setMenuLight();
  });
  menuToggle.addEventListener("hide.bs.collapse", function () {
    setMenu();
  });

  document.body.onscroll = collapseMenu;

  function collapseMenu(e) {
    let checkIfNavbarItem = async function () {
      let navbarItem = false;

      for (path of event.path) {
        if (path.className && path.className.includes("navbar")) {
          navbarItem = true;
        }
      }
      return navbarItem;
    };
    checkIfNavbarItem().then((navbarItem) => {
      if (!navbarItem) {
        bsCollapse.hide();
      }
    });
  }

  function setMenu() {
    if (window.pageYOffset > 40) {
      setMenuLight();
    } else {
      setMenuDark();
    }
  }

  function setMenuLight() {
    nav.classList.add("bg-white", "navbar-light");
    nav.classList.remove("navbar-dark", "shadow");
    logo.src =
      "./assets/logo_LIINK.webp";
  }
  function setMenuDark() {
    nav.classList.remove("bg-white", "navbar-light");
    nav.classList.add("navbar-dark");
    logo.src =
      "./assets/icoon_LIINK-wit.webp";
  }

  if (window.innerWidth > 992) {
    document
      .querySelectorAll(".navbar .nav-item")
      .forEach(function (everyitem) {
        everyitem.addEventListener("mouseover", function (e) {
          let el_link = this.querySelector("a[data-bs-toggle]");

          if (el_link != null) {
            let nextEl = el_link.nextElementSibling;
            el_link.classList.add("show");
            nextEl.classList.add("show");
          }
        });
        everyitem.addEventListener("mouseleave", function (e) {
          let el_link = this.querySelector("a[data-bs-toggle]");

          if (el_link != null) {
            let nextEl = el_link.nextElementSibling;
            el_link.classList.remove("show");
            nextEl.classList.remove("show");
          }
        });
      });
  }
  // srcoll progress line
   const container = document.getElementById('js-scroll-container');
   const highlight = document.getElementById('js-scroll-highlight');
   let containerHeight;

   window.onscroll = function(){
     containerHeight = container.offsetHeight - window.innerHeight;
     let containerPos = container.getBoundingClientRect();
     let diff = containerHeight + containerPos.top;
     let progressPercentage = diff / containerHeight * 100;
     let cssWidth = Math.floor(100 - progressPercentage);
     highlight.style.width = cssWidth + "%";
   }
});


function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}



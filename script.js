let intro = document.querySelector('.splash');
let logoSpan = document.querySelectorAll('.splash-logo');

if(intro && getCookie('visitedBefore')) {
  intro.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', ()=>{
 if(intro && !getCookie('visitedBefore')) {
   setCookie('visitedBefore', true, 1);
   setTimeout(()=>{
      logoSpan.forEach((span, idx)=>{
         setTimeout(()=>{
            span.classList.add('active');            
         }, (idx + 1) * 400)
      });
      setTimeout(()=>{
         logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
               span.classList.remove('active');
               span.classList.add('fade');
            }, (idx +1) * 50)
         })
      }, 2000);
      setTimeout(()=>{
         intro.style.top = '-100vh';
      }, 2400)
   });
 }


  const nav = document.querySelector('.my-nav');
  const logo = document.getElementById('js-imgsrc');
  setMenu();
  window.addEventListener('scroll', function () {
    setMenu();
  });

  const navLinks = document.querySelectorAll('.nav-item:not(.dropdown)');
  const menuToggle = document.getElementById('main-nav');
  const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});
  
  Object.keys(window).forEach(key => {
    if (/^onclick/.test(key)) {
      window.addEventListener(key.slice(2), event => {
        let checkIfNavbarItem = async function() { 
          let navbarItem = false;
            for (path of event.path) {
              if (path.className && path.className.includes("navbar")) {
                 navbarItem = true;
              }
            }
          return navbarItem;
        };
        checkIfNavbarItem().then(
          navbarItem => {
            if (!navbarItem) {
              bsCollapse.hide();
            }
          }
        );
         
        
      });
    }
  });

  navLinks.forEach((l) => {
      l.addEventListener('click', () => { bsCollapse.hide() });
  });
  
  menuToggle.addEventListener('show.bs.collapse', function () {
    setMenuLight();
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
  });
  menuToggle.addEventListener('hide.bs.collapse', function () {
    setMenu();
    document.body.style.height = '';
    document.body.style.overflow = '';
  });
  
  function setMenu() {
    if (window.pageYOffset > 40) {
      setMenuLight();
    } else {
      setMenuDark();
    }
  }
  
  function setMenuLight() {
      nav.classList.add('bg-white', 'navbar-light');
      nav.classList.remove('navbar-dark', 'shadow');
      logo.src = 'https://cdn.glitch.global/e712696b-e143-452d-a9a6-169e01e61598/logo_LIINK.png?v=1643813514737';
  }
  function setMenuDark() {
      nav.classList.remove('bg-white', 'navbar-light');
      nav.classList.add('navbar-dark');
      logo.src = 'https://cdn.glitch.global/e712696b-e143-452d-a9a6-169e01e61598/icoon_LIINK-wit.png?v=1643813514667';
  }
});



function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
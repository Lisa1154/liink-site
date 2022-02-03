// This is a single line JS comment
/*
This is a comment that can span multiple lines 
- use comments to make your own notes!
*/


let intro = document.querySelector('.splash');
let logoSpan = document.querySelectorAll('.splash-logo');

window.addEventListener('DOMContentLoaded', ()=>{
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
   })
})




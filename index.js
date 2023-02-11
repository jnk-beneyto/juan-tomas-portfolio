

 (function() {
  const sideBarMenu = document.querySelector('#sidebarMenu')
  const selector = document.querySelector('input[type=checkbox]');
  const closebtns = document.getElementsByClassName("dropdown");

  for (let i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function() {
      selector.checked = false;
    });
  }
 })()
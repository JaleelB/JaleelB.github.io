//welcome page 
/* Menus:
  How To Play
  Levels
  Quit
  Settings??
   */

//rick and morty music plays in background
//hover over text is green for menus

window.onload = function () {
  document.getElementById("welcome").play();
}

$(document).ready(function () {
  $("#welcome").get(0).volume = .1;

  $(".wp").hover(function(){
    $("#button-hover").get(0).play();
  })

});
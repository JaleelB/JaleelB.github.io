 /*Jaleel Bennett*/

var tiles = []; //stores image square objects 
var empty_tile, current_tile;
var num_moves = 0;
var seconds = 0;
var empty_index = 0, current_index = 0;
var empty_decrement = 0, empty_increment = 0;
var timer;

//string of number 1-9
//each set of three nunbers represents each row

var squares = '12836457';
//var squares = '12645378';

$(document).ready(function () {

  function createGrid() {
    for (x in squares) {
      if (x <= 1) {
        // $(".image-grid").append('<div class="tile" id="square-'+squares[x]+'"></div>');
        if (squares[x] != '8') $(".row1").append('<div class="tile" id="square-' + squares[x] + '"></div>');
        else {
          $(".row1").append('<div class="empty" id="square-' + squares[x] + '"></div>');
        }
      }
      else if (x > 1 && x <= 3) {
        // $(".image-grid").append('<div class="tile" id="square-'+squares[x]+'"></div>');
        if (squares[x] != '8') $(".row2").append('<div class="tile" id="square-' + squares[x] + '"></div>');
        else {
          $(".row2").append('<div class="empty" id="square-' + squares[x] + '"></div>');
        }
      }
      else if (x > 3 && x <= 5) {
        // $(".image-grid").append('<div class="tile" id="square-'+squares[x]+'"></div>');
        if (squares[x] != '8') $(".row3").append('<div class="tile" id="square-' + squares[x] + '"></div>');
        else {
          $(".row3").append('<div class="empty" id="square-' + squares[x] + '"></div>');
        }
      }
      else if (x > 5 && x <= 7) {
        // $(".image-grid").append('<div class="tile" id="square-'+squares[x]+'"></div>');
        if (squares[x] != '8') $(".row4").append('<div class="tile" id="square-' + squares[x] + '"></div>');
        else {
          $(".row4").append('<div class="empty" id="square-' + squares[x] + '"></div>');
        }
      }
      
    }
  }


  function AddGridToArray() {
    for (let i = 0; i < 8; i++) {
      var grid_tile = $("#square-" + squares[i]);
      tiles.push(grid_tile);
    }
    
  }

  createGrid();
  AddGridToArray();
  Timer();
  imageClick();
 

  //starts timer on first image clcik
  function Timer() {
        $(".game-box").click(function () {
      $('.game-box').unbind('click');
      var minutes = 0;
      timer = setInterval(function () {
        seconds++;
        //minutes = Math.floor(seconds/60);
        // minutes = Math.floor(seconds/60);

        var minute_display, seconds_display;
        if(minutes < 10 ){
          minutes_display = '0'+minutes;
        }
        else{
          minutes_display = minutes;
        }

        if(seconds < 10){
          seconds_display = '0'+seconds;
        }
        else if(seconds >=10 && seconds <=59){
          seconds_display = seconds;
        }
        else if(seconds === 60){
          minutes++;
          seconds =0;
          seconds_display = '0'+seconds;
          minutes_display = '0'+minutes;
          
        }

        document.getElementById('displayTime').innerHTML = minutes_display + ':' + seconds_display;

        if (checkWin()) {
          clearInterval(timer);
        }
      }, 1000);
  
    })
  
  }



  //swaps empty tile with clciked tile
  function swapEmptyTile(clicked, et_index, ct_index) {

    //keeps track of p[layer moves]. If time ends player will not be allowed to make any moves
    num_moves++;
    document.getElementById('moves').innerHTML = 'Moves: ' + num_moves;

    //swiches the classes bewteen tle and empty tile
    
    clicked.removeClass("tile").addClass("empty");
    empty_tile.removeClass("empty").addClass("tile");
    var clicked_pos = clicked.css("background-position");
    empty_tile.css("background-position", clicked_pos);

    var temp_id = $(clicked).attr("id");
    var empty_id = $(empty_tile).attr("id");
    clicked.attr('id', empty_id);
    empty_tile.attr('id', temp_id);


  }

 

  function imageClick() {
    $(".tile, .empty").click(function () {
      if (seconds > 0 && !checkWin()) {
        if ($(this).hasClass("empty")) return; //does nothing if empty tile is clicked

        current_tile = $(this); //stores clicked tile in variable
        empty_tile = $(".empty"); //stores tile with empty class in empty tile variable

        for (let i = 0; i < 8; i++) {
          if (empty_tile.is(tiles[i])) empty_index = i;
          if (tiles[i].is($(this))) current_index = i;
        }
        
        if (empty_tile.prev().is(current_tile)) {
          swapEmptyTile(current_tile, empty_index, current_index);
          whenWin();
          
        } else if (empty_tile.next().is(current_tile)) {
          swapEmptyTile(current_tile, empty_index, current_index);
          whenWin();
        }
        else if ((current_index - 2 >= 0 ? tiles[current_index -2].is(empty_tile) : false)) {
          swapEmptyTile(current_tile, empty_index, current_index);
          whenWin();
        }
        else if ((current_index + 2 <= 8 ? tiles[current_index + 2].is(empty_tile) : false)) {
          swapEmptyTile(current_tile, empty_index, current_index);
          whenWin();
        }
        else {
          //if (num_moves > 0){
            $('.image-grid').effect("bounce", "slow");
            $('#wrong-click').get(0).play();
          //} 
        }
      }

    })
  }
  //handles click operations of images


  //checsk win status of game
  function checkWin() {
    if (seconds > 0) {
      for (let i = 0; i < 8; i++) {
        if (tiles[i].attr('id') != "square-" + (i + 1)) {
          return false;
        }
      }
      return true;
    }
  }


  //create a function that does something when user wins
  //victory sound plays
  //confetti sprays
  //sad mort appears with dialog to take you to next level
  function whenWin() {
    
    if (checkWin()) {
      $("body").append("<img src='images/lose-morty.png' width='230px' height='600px' style='position: fixed; bottom: 1px; right: 150px;' id='m-rick'>");
      clearInterval(timer);
      
      $("#losemorty-dialog").dialog({
        width: 100,
        height: 100,
        position: { my: "center", at: "right center", of: window }
      });

      $("#victory").get(0).play();
      $.confetti.start();
    }
  }

function addGifToScreen() {
    var time = 15, sec = 0;
    let gif_count = 1;
    let gif_timer = setInterval(function () {
      sec++
      if (checkWin()) {
        clearInterval(gif_timer);
      }
      if (time === sec) {
        time += 15;
        let gif = $("#gif-" + gif_count);
        gif.css("display", "block");

        setTimeout(function () {
          $(gif).fadeOut("slow");
        }, 15000);

        if (gif_count == 3) gif_count = 1;
        else {
          gif_count++;
        }
      }
    }, 1000);
  }
  addGifToScreen();


  function displayInfo() {
    document.getElementById('level').innerHTML = 'Level: 1';
  }
  displayInfo();


  //handles the appearance and disappearance of npc
  var addRick = function () {
    $("body").append("<img src='images/greeting-rick.png' width='330px' height='600px' style='position: fixed; bottom: 1px; right: 100px;' id='g-rick'>");
    
  };
  addRick();

  $("#happrick-dialog").dialog({
    width: 100,
    height: 100,
    position: { my: "center", at: "right center", of: window }
  });

  setTimeout(function () {
    $("#g-rick").fadeOut("slow");
    $(".ui-dialog").fadeOut("slow");
  }, 15000);

  var addEndGameRick = function () {
    if (seconds < 10) {
      $("body").append("<img src='images/greeting-rick.png' width='330px' height='600px' style='position: fixed; bottom: 1px; right: 100px;' id='g-rick'>");
    }
  };

  setTimeout(function(){
    $("#clue").fadeOut("slow");
  },10000);

  /*Jaleel Bennett*/


  /* idris lawal */
  $('.sidenav').sidenav();
  $('.modal').modal({dismissable: false});


});

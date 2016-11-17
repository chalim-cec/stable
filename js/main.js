//number of objects as a global var here
var MENU_ITEM_COUNT = 42;

$(window).on("load", function() {

  var menuRotation = 0;

  createMenu();
  gameSize();

  //next menu items
  $("#menu_next").click(function(event) {
      event.preventDefault();
      menuNext();
  });

  //previous menu items
  $("#menu_back").click(function(event) {
      event.preventDefault();
      menuBack();
  });

  //save screenshot
  $("#save_btn").click(function() { 
    saveScreenshot();
  });

  //deletes all items
  $("#restart_btn").click(function() { 
    $(".game_object").remove();
  });

  //rotates items in menu
  $("#rotate_btn").click(function() { 
    menuRotation = rotateMenuItems(menuRotation);
  });

  //click menu object
  $(".menu_object").click(function(event) {
      var src = event.target.getAttribute('src');
      var img =  $('<img class="draggable game_object">');
      img.attr('src', src);
      img.appendTo('#game_objects');
  }); 

});   //onload

$( window ).resize(function() {
  gameSize();
});

/*
 * creates menus and populates them, depending on MENU_ITEM_COUNT
 */ 
function createMenu(){
  //creating menu
  var menuGroupCount = Math.ceil(MENU_ITEM_COUNT/14);
  for (i=0; i < menuGroupCount; i++){
    var menuDiv = $('<div class = "menu">');
    menuDiv.attr('data-menu_group', i);
    menuDiv.insertBefore('#menu_nav_container');
  }
  $('[data-menu_group=0]').addClass("menu-active");

  //populating menu
  for (i=0; i < MENU_ITEM_COUNT; i++){
    var img = $('<img class = "menu_object">');
    var src='img/menuItems/img'+i+'_0.svg';
    img.attr('src', src);
    var menuGroup = Math.floor(i/14);
    img.appendTo('[data-menu_group='+menuGroup+']'); //put menugroup here
  }
}


/*
 * next button on menu
 */
function menuNext() {
  var currentMenu = $(".menu-active")
  if (currentMenu.next(".menu").length){
    currentMenu.next("div").addClass("menu-active");
  } else { 
    currentMenu.parent().children(".menu").first().addClass("menu-active");
  }
  currentMenu.removeClass("menu-active");
}

/*
 * back button on menu
 */
function menuBack() {
  var currentMenu = $(".menu-active")
  if (currentMenu.prev(".menu").length){
    currentMenu.prev("div").addClass("menu-active");
  } else { 
    currentMenu.parent().children(".menu").last().addClass("menu-active");
  }
  currentMenu.removeClass("menu-active");
}

/*
 * rotates items in the visible menu
 * returns new rotation
 */
function rotateMenuItems(menuRotation){
    newMenuRotation = (menuRotation+1)%4;
    var menuList =  document.getElementsByClassName("menu-active")[0].getElementsByClassName("menu_object"); 
    $.each(menuList, function(i, menuObj) {
      src = menuObj.getAttribute('src');
      var regexp = /([a-zA-Z0-9\-]*\_)(\d)\.svg$/;
      var match = regexp.exec(src);
      var imageName = (match[1]);   //before underscore 
      menuObj.setAttribute('src', 'img/menuItems/'+imageName+newMenuRotation+'.svg');              
    });
    return newMenuRotation;
}

/*
 * saves screenshot
 */
function saveScreenshot(){
  var node = document.getElementById("playarea_container");
  domtoimage.toBlob(node).then(function (blob) {
      window.saveAs(blob, 'office-screenshot.png');
  });
}

/*
 * sizes game based on screen rotation
 */
function gameSize() {
  if (matchMedia('all and (orientation:portrait)').matches){
    /*menu sits horizontally, to be below office*/
    $("#playarea_container").removeClass("col-xs-10");
    $("#playarea_container").addClass("col-xs-12");
    $("#menu_container").removeClass("col-xs-2");
    $("#menu_container").addClass("col-xs-12");
    
    /*move rotate button to left, menu nav to right*/
    $("#rotate_container").addClass("col-xs-1 vert-center_container");
    $("#rotate_btn").addClass("vert-center");
    $("#menu_nav_container").addClass("col-xs-1 vert-center_container");
    $("#menu_nav").addClass("vert-center");
    $("#menu_nav").addClass("menu-horizontal");
    $(".menu").addClass("col-xs-10");
    $(".menu").addClass("vert-center");

  } else { 
    /*menu sits vertically, to left of office*/
    $("#playarea_container").addClass("col-xs-10");
    $("#playarea_container").removeClass("col-xs-12");
    $("#menu_container").addClass("col-xs-2");
    $("#menu_container").removeClass("col-xs-12");

    /*rotate button at top, menu nav at bottom*/
    $("#rotate_container").removeClass("col-xs-1 vert-center_container");
    $("#rotate_btn").removeClass("vert-center");
    $("#menu_nav_container").removeClass("col-xs-1 vert-center_container");
    $("#menu_nav").removeClass("vert-center");
    $("#menu_nav").removeClass("menu-horizontal");
    $(".menu").removeClass("col-xs-10");
    $(".menu").removeClass("vert-center");
  }
}

/*
 * target elements with the "draggable" class
 */
interact('.draggable')
  .draggable({
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');
    }
});


function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}


/*
 * deals with delete dropzone
 */
interact('#delete_dropzone').dropzone({
  accept: '.game_object',
  // Require a 50% element overlap for a drop to be possible
  overlap: 0.05,

  ondragenter: function (event) {
    event.target.children[0].classList.add('dropzone-active');
    event.relatedTarget.classList.add('droppable');
  },
  ondragleave: function (event) {
    event.target.children[0].classList.remove('dropzone-active');
    event.relatedTarget.classList.remove('droppable');
  },
  ondrop: function (event) {
    event.target.children[0].classList.remove('dropzone-active');
    //because IE can't directly remove element
    event.relatedTarget.parentElement.removeChild(event.relatedTarget);
  }
});
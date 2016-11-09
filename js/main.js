
$(document).ready(function() {
  gameSize();

});

$(window).on("load", function() {

  //save screenshot
  $("#save_btn").click(function() { 
    var node = document.getElementById("playarea_container");
    domtoimage.toBlob(node).then(function (blob) {
        window.saveAs(blob, 'office-screenshot.png');
    });
  });

  //deletes all items
  $("#restart_btn").click(function() { 
    $(".game_object").remove();
  });

  //rotates items in menu
  $("#rotate_btn").click(function() { 
    console.log("hello!");
    var menuList =  document.getElementsByClassName("menu_object"); 

    var src = menuList[6].getAttribute('src');
    var regexp = /([a-zA-Z0-9\-]*\_)(\d)\.svg$/;
    var match = regexp.exec(src);
    var imageName = (match[1]);   //before underscore
    var rotation = match[2];      //number [0,3] after underscore
    rotation++;

    $.ajax({
        url:'img/'+imageName+rotation+'.svg',
        type:'HEAD',
        error: function()
        {
            console.log("doesn't exist!");
        },
        success: function()
        {
            console.log("exists!");
        }
    });

    for (i=0; i<menuList.length; i++){
      //var x = menuList[i].getAttribute('src');
      //console.log(x);
      //menuList[i].setAttribute('src', "img/couch_blue2_0.svg");

    }
  });

});

$( window ).resize(function() {
  gameSize();
});

function gameSize() {
  if (matchMedia('all and (orientation:portrait)').matches){
    console.log("test");
    $("#playarea_container").removeClass("col-xs-10");
    $("#playarea_container").addClass("col-xs-12");
    $("#menu_container").removeClass("col-xs-2");
    $("#menu_container").addClass("col-xs-12");
  } else { 
    $("#playarea_container").addClass("col-xs-10");
    $("#playarea_container").removeClass("col-xs-12");
    $("#menu_container").addClass("col-xs-2");
    $("#menu_container").removeClass("col-xs-12");
  }
}

// target elements with the "draggable" class
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

  $(target).on('touchend mouseup', function(e){
    if($(target).overlaps('#delete_btn').length){
      $(target).remove();
    }
  });

}

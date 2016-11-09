
$(document).ready(function() {
  gameSize();

});

$(window).on("load", function() {

  $("#save-btn").click(function() { 
    var node = document.getElementById("playarea-container");
    domtoimage.toBlob(node).then(function (blob) {
        window.saveAs(blob, 'office-screenshot.png');
    });
  });

  //deletes all items
  $("#restart-btn").click(function() { 
    $(".game-object").remove();
  });

});

$( window ).resize(function() {
  gameSize();
});

function gameSize() {
  if (matchMedia('all and (orientation:portrait)').matches){
    console.log("test");
    $("#playarea-container").removeClass("col-xs-10");
    $("#playarea-container").addClass("col-xs-12");
    $("#menu-container").removeClass("col-xs-2");
    $("#menu-container").addClass("col-xs-12");
  } else { 
    $("#playarea-container").addClass("col-xs-10");
    $("#playarea-container").removeClass("col-xs-12");
    $("#menu-container").addClass("col-xs-2");
    $("#menu-container").removeClass("col-xs-12");
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
    if($(target).overlaps('#delete-btn').length){
      $(target).remove();
    }
  });

}

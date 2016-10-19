/*$(document).ready(function() {
  gameSize();
});

$( window ).resize(function() {
  gameSize();
});

function gameSize() {
  console.log("whaddup");
  var mql = window.matchMedia("(max-width: 710px)");

  if (mql.matches) {
    console.log("yes");
    $("#office-container").addClass("col-sm-10");
    $("#office-container").css({"float": "none", "display": "block", "width": "auto"});
    $("#menu-container").addClass("col-sm-10");
    $("#menu-container").css({"float": "none", "display": "block", "width": "auto"});
    $("#game-container").css({"display": "block"});
  } else {
    console.log("no");
    $("#menu-container").removeClass("col-sm-10");
    $("#menu-container").css({"float": "right", "width": "200"});
    $("#office-container").removeClass("col-sm-10");
    $("#office-container").css({"float": "right", "width": "500"}); 
    $("#game-container").css({"display": "inline-block"}); 
  }
}
*/

$(document).ready(function() {
  gameSize();
});

$( window ).resize(function() {
  gameSize();
});

function gameSize() {
  if (matchMedia('all and (orientation:portrait)').matches){
    $("#office-container").addClass("col-xs-12");
    $("#office-container").removeClass("col-xs-10");
    $("#menu-container").addClass("col-xs-12");
    $("#menu-container").removeClass("col-xs-2");
  } else { 
    $("#office-container").removeClass("col-xs-12");
    $("#office-container").addClass("col-xs-10");
    $("#menu-container").removeClass("col-xs-12");
    $("#menu-container").addClass("col-xs-2");
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
    snap: {
      targets: [
        interact.createSnapGrid({ x: 30, y: 30 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },
    // enable autoScroll
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
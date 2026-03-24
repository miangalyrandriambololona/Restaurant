//Variables
var active = 'active'
var block = '.block-w'
var inactive = 'min'
var text = '.fadetext'
var wrapper = '.wrapper'

//Remove Functions
function removeActive() {
  $(block).removeClass(active)
}

function removeInactive() {
  $(block).removeClass(inactive)
}

//jQuery
$(block).on('click', function() {
  $(block).removeClass(inactive)
  $(this).toggleClass(active).siblings().removeClass(active).toggleClass(inactive)
})

$(document).mouseover(function(e) {
  var container = $(block);
  if (container.has(e.target).length === 0) {
    setTimeout(removeInactive, 100);
    setTimeout(removeActive, 100);
  }
});
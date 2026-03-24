const controller = new ScrollMagic.Controller();
const sections = document.querySelectorAll('section');
const menu = document.querySelector('.menu_color');


sections.forEach((section, index, arr) => {
  const trigger = '#' + section.id;
  const backgroundColor = window.getComputedStyle(section, null).getPropertyValue('background-color');
 
  const textColor = getContrastYIQ(backgroundColor);

  let previousBackgroundColor = backgroundColor;
  let previousTextColor = getContrastYIQ(previousBackgroundColor);
  

  if (index >= 1) {
    previousBackgroundColor = window.getComputedStyle(arr[index - 1], null).getPropertyValue('background-color');
    previousTextColor = getContrastYIQ(previousBackgroundColor);
  }

  new ScrollMagic.Scene({
      triggerElement: trigger,
      triggerHook: "onLeave",
      offset: -50,
      reverse: true
    })
    .on("enter", function() {
      menu.classList.remove(previousTextColor);
      menu.classList.add(textColor);

    })
    .on("leave", function() {
      menu.classList.remove(textColor);       menu.classList.add(previousTextColor);

    })
    .addTo(controller);
})

// Color contrast helper function
// https://en.wikipedia.org/wiki/YIQ
function getContrastYIQ(rgb) {
  rgb = rgb.substring(4, rgb.length - 1)
    .replace(/ /g, '')
    .split(',');
  const yiq = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

// document.getElementById('arrow').addEventListener("click", function( event ) {  
//     document.getElementById('s2').scrollIntoView();
// }, false);


 //屏幕自适应 宽度16等分
function rem(ev) {
  var html = document.querySelector('html');
  var deviceWidth = html.getBoundingClientRect().width;
  // console.log("屏幕宽度-->" + deviceWidth);
  // console.log("像素比-->" + window.devicePixelRatio);
  html.style.fontSize = deviceWidth / 16 + 'px';
}
const computedRem=function(){
  rem();
  window.addEventListener('resize', rem, false);
}

export default computedRem
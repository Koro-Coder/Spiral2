const canvas = document.querySelector("canvas");
console.log(canvas);

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', (event)=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const diff = 0.8;
const beg = 6;
const end = 105;
var angle = 0;

function calcX(z){
  return z * Math.sin(z);
}
/////////////////////////////////


function calcY(z){
  y = Math.sqrt(z * z * Math.cos(z) * Math.cos(z) + Math.pow(1000/Math.sqrt(z) - innerHeight/2, 2)) *
  Math.sin(angle + Math.atan((1000/Math.sqrt(z) - innerHeight/2) / (z * Math.cos(z))));
  if(Math.floor(z/(Math.PI/2))%4==1 || Math.floor(z/(Math.PI/2))%4==2) y=-y;
  return y;
}

x1 = Math.abs(calcX(beg));
y1 = calcY(beg);

x2 = Math.abs(calcX(end));
y2 = calcY(end);

var speed = 0.01;
var dz = 0;
angle = -1.57;
var startX;
var startY;
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);
  //c.fillStyle = "white";
  //c.fill();
  c.stroke();
  c.beginPath();
  for (let z = end - dz; z >= beg; z -= diff) {
    x = (innerWidth / (2 * x2)) * calcX(z) + innerWidth / 2;
    y = calcY(z);
    y = (innerHeight / (y1 - y2)) * (y - y2);
    rad = 6 * ((end+diff-z)/(end-beg));

    var gradient = c.createRadialGradient(x, y, 0, x, y, rad);
    gradient.addColorStop(0.7, "white");
    gradient.addColorStop(1, "transparent");

    //c.beginPath();
    c.lineTo(x, y);
    //c.fillStyle = gradient;
    //c.fill();
    //c.strokeStyle = "transparent";
    //c.stroke();
  }
  c.stroke();
  dz += speed;
  if (dz > diff) dz = 0;
  if(dz<0) dz = diff; 
}

animate();


canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

function handleMouseDown(event) {
  isMouseDown = true;
  startX = event.clientX;
  startY = event.clientY;
}

function handleMouseMove(event) {
  if (!isMouseDown) return;

  var deltaX = event.clientX - startX;
  var deltaY = event.clientY - startY;

  rotateObject1(deltaX, deltaY);

  startX = event.clientX;
  startY = event.clientY;
}

function handleMouseUp() {
  isMouseDown = false;
}

function handleTouchStart(event) {
  event.preventDefault();
  var touch = event.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
}

function handleTouchMove(event) {
  event.preventDefault();
  var touch = event.touches[0];
  var deltaX = touch.clientX - startX;
  var deltaY = touch.clientY - startY;

  rotateObject2(deltaX, deltaY);

  startX = touch.clientX;
  startY = touch.clientY;
}

function handleTouchEnd(event) {
  event.preventDefault();
}

function rotateObject1(dx, dy){
  speed = dx*(0.001);
  if(speed>0.3)
    speed=0.3;
  else if(speed<-0.3)
    speed=-0.3;

  angle-=dy*(0.01);
}

function rotateObject2(dx, dy){
  speed = dx*(0.01);
  if(speed>0.3)
    speed=0.3;
  else if(speed<-0.3)
    speed=-0.3;

  angle-=dy*(0.01);
}
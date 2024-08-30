const myCanva = document.getElementById('myCanva');
myCanva.width = window.innerWidth;
myCanva.height = window.innerHeight;
const c = myCanva.getContext('2d');



let mouse = {
  x: undefined,
  y: undefined,
}

let colorArray = [
  '#ff3y',
  '#dd57',
  '#56l',
  '#53ea',
  '#d563',
  ];


let maxr = 40;
let minr = 2;
window.addEventListener('mousemove', (e)=>{
  mouse.x = e.x;
  mouse.y = e.y;
})

window.addEventListener('resize', ()=>{
  myCanva.width = window.innerWidth;
myCanva.height = window.innerHeight;
init();
})

function Circle(x,y,dx,dy,radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  
  
  this.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, 
  this.radius, 0, Math.PI * 2, false);
  c.strokeStyle = 'aqua';
  c.fillStyle = this.color;
  c.stroke();
  c.fill();
  }
  
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerWidth || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  if (
    mouse.x - this.x < 50 && mouse.x - this.x > -50
    ) 
    {
      if (this.radius < maxr) {
      this.radius += 1;
      }
   }else if(this.radius > this.minRadius) {
        this.radius -= 1;
    }
    
     this.draw();
  }
  
}


let pushcircle = [];

function init() {
  pushcircle = [];
  for (let i = 0; i < 400; i++) {
    let x, y, dx, dy;
    let radius = Math.random() * 3 + 1;
  
    x = Math.random() * (innerWidth - radius * 2) + radius;
    y = Math.random() * (innerHeight - radius * 2) + radius;
    dx = (Math.random() - 0.5);
    dy = (Math.random() - 0.5);
    pushcircle.push(new Circle(x, y, dx, dy, radius));
  }
}


function animate() {
let length = pushcircle.length;

  requestAnimationFrame(animate)
  c.clearRect(0,0,innerWidth,innerHeight);
  
  for (let i = 0; i < length; i++) {
    pushcircle[i].update();
  }
}

init();
animate();
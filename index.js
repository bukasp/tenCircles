/**@type {HTMLCanvasElement} */
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('button');

let x;
let y;
let r;
let pos = [];
let count = 0;
let d;

btn.addEventListener('click', () => {
  pos = [];
  createCircles();
  draw();
});

createCircles();
draw();

// Просто рандом
function rand(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// Генерация координат
function posFunc() {
  x = rand(60, 740);
  y = rand(60, 440);
  r = rand(10, 60);
}

// функция запуска алгоритма коллизий двух кругов
function collision(x1, x2, y1, y2, r1, r2) {
  d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  if (d < r1 + r2) {
    // console.log('столкнулись');
    return false;
  }
  if (d > r1 + r2) {
    // console.log('не столкнулись');
    return true;
  }
}

// Проверка коллизии последнего созданного круга с остальными и в случае
// совпадения удаляет, создает новый и проверяет заново
function reCollission() {
  for (let k = 1; k <= pos.length - 1; k++) {
    for (let i = 0; i <= pos.length - 1; i++) {
      if (i !== k) {
        if (collision(pos[i].x, pos[k].x, pos[i].y, pos[k].y, pos[i].r, pos[k].r) === false) {
          pos.splice(-1);
          posFunc();
          pos.push({
            'x': x,
            'y': y,
            'r': r
          });
          reCollission();
        }
      }
    }
    count++;
  }
}

// Генерация позиций кругов
function createCircles() {

  for (let m = 0; m <= 9; m++) {
    posFunc();
    pos.push({
      'x': x,
      'y': y,
      'r': r
    });
    reCollission();
  }
}

// Отрисовка
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i <= pos.length - 1; i++) {
    ctx.beginPath();
    ctx.arc(pos[i].x, pos[i].y, pos[i].r, 0, 2 * Math.PI);
    ctx.fillStyle = '#df34b4ff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.stroke();
    ctx.closePath();
  }
}
import BallJS from '@/utils/canvas/ball.js'

function backgroundBall(_canvas, CANVAS_WIDTH, CANVAS_HEIGHT, isClip) {
    let ball0 = new BallJS.Ball(),
        ball1 = new BallJS.Ball(), 
        ball2 = new BallJS.Ball(), 
        ball3 = new BallJS.Ball(),
        ballArr = [ball0, ball1, ball2, ball3];


    let _context = _canvas.getContext('2d'),
        // CANVAS_WIDTH = window.innerWidth,
        // CANVAS_HEIGHT = window.innerHeight,
        topX = CANVAS_WIDTH,
        bottomX = CANVAS_WIDTH,
        speed = 8,
        canDrawRect = true,
        linear = _context.createLinearGradient(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    //背景色
    linear.addColorStop(0,'#1C3CD8');
    linear.addColorStop(0.5,'#0B92E7');
    linear.addColorStop(1,'#0BB6EB');

    let ballGroup = [
        {x: CANVAS_WIDTH*2/3, y: CANVAS_HEIGHT/2, r: 50, color: ['#0B92E7', '#0BADEA', '#07C3ED'], vx: 1 + Math.random(), vy: 1 + Math.random()},
        {x: CANVAS_WIDTH*4/5, y: CANVAS_HEIGHT/3, r: 150, color: ['#06C8EE', '#0BA2E9', '#176CE0'], vx: 2 + Math.random(), vy: 0.5 + Math.random()},
        {x: CANVAS_WIDTH*1/2, y: CANVAS_HEIGHT/2.5, r: 100, color: ['#176CE0', '#0B92E7', '#06C8EE'], vx: 1.5 + Math.random(), vy: 0.75 + Math.random()},
        {x: CANVAS_WIDTH*3/4, y: CANVAS_HEIGHT/1.2, r: 75, color: ['#0B92E7', '#0BAAEA', '#08C2ED'], vx: 3 + Math.random(), vy: 1.25 + Math.random()}
    ]

    _canvas.width = CANVAS_WIDTH;
    _canvas.height = CANVAS_HEIGHT;

    let width = _canvas.width,
        height= _canvas.height;

    ballGroup.forEach((element, index) => {
        ballArr[index].x = element.x;
        ballArr[index].y = element.y;
        ballArr[index].r = element.r;
        ballArr[index].color = element.color;
        ballArr[index].vx = element.vx;
        ballArr[index].vy = element.vy;
    });

    // 抗锯齿
    if (window.devicePixelRatio) {
        _canvas.style.width = width + "px";
        _canvas.style.height = height + "px";
        _canvas.height = height * window.devicePixelRatio;
        _canvas.width = width * window.devicePixelRatio;
        _context.scale(window.devicePixelRatio, window.devicePixelRatio);
    } else {
        _canvas.style.width = width + "px";
        _canvas.style.height = height + "px";
        _canvas.height = height * 4;
        _canvas.width = width * 4;
        _context.scale(4, 4);
    }

    // 动画
    (function draw() {
        window.requestAnimationFrame(draw, _canvas);
        _context.clearRect(0,0,_canvas.width,_canvas.height);

        //裁定可视区
        _context.save();
        _context.beginPath();
        _context.moveTo(CANVAS_WIDTH, 0);
        _context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
        _context.lineTo(bottomX, CANVAS_HEIGHT);
        _context.lineTo(topX, 0);
        _context.closePath();
        _context.fill();
        _context.clip();
            
        //背景色    
        _context.fillStyle = linear;
        _context.rect(0, 0, _canvas.width, _canvas.height);
        _context.fill();
        
        ball0.move(width, height, _context, isClip);
        ball1.move(width, height, _context, isClip);
        ball2.move(width, height, _context, isClip);
        ball3.move(width, height, _context, isClip);
        
        _context.restore();

        if(isClip) {
            if(topX > CANVAS_WIDTH*1/3) {
                topX -= 2*speed;
            } else {
                topX = topX;
            }
            
            if(bottomX > CANVAS_WIDTH*2/3) {
                bottomX -= speed;
            }
        }
        else {
            topX = 0;
            bottomX = 0;
        }
    })()
}

export default {
    backgroundBall
}
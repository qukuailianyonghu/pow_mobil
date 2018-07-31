var Ball = function() {}

Ball.prototype =  {
    init() {
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.color = [];
        this.vx = 0;
        this.vy = 0;
    },
    draw(ctx) {
        let linear = ctx.createLinearGradient((this.x - this.r), (this.y - this.r), (this.x + this.r),  (this.y + this.r));
        linear.addColorStop(0,this.color[0]);
        linear.addColorStop(0.5,this.color[1]);
        linear.addColorStop(1,this.color[2]);
        
        ctx.beginPath();
        ctx.fillStyle = linear;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        ctx.fill();
    },
    move(w, h, ctx, isClip) {
        this.x += this.vx;
        this.y += this.vy;
        if(isClip) {
            if (this.x - this.r/2 - w/3 < 0 || this.x + this.r/2 > w) {
                this.vx = -this.vx
            }
            if (this.y - this.r/2 < 0 || this.y + this.r/2 > h) {
                this.vy = -this.vy
            }
        } else {
            if (this.x - this.r/2 < 0 || this.x + this.r/2 > w) {
                this.vx = -this.vx
            }
            if (this.y - this.r/2 < 0 || this.y + this.r/2 > h) {
                this.vy = -this.vy
            }
        }
        
        this.draw(ctx);
    }
}



export default {
    Ball
}
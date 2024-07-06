class EndPage{
    particles = new Particles();

    constructor(onStart){
        this.onStart = onStart;
        
        this.startTxt = new EvText(0, 0,'START OVER',30,BOLD);
        this.startBtn = new EvButton(windowWidth/2, windowHeight/2+100, 220, 50, this.startTxt, () => {
            print('start clicked')
            this.onStart();
        });
        this.welcomeTxt = new EvText(windowWidth/2-180, windowHeight/2, "Thank you!", 70, BOLD, "#000000");
        
    }


    draw(){
        screen.push();
        screen.background(PINK_COLOR);
        this.startBtn.draw();
        this.welcomeTxt.draw();
        this.particles.draw();
        screen.noStroke();
        screen.fill(0);
        screen.text('by Eden Vardi',30,40);        
        screen.textSize(20);
        image(screen, 0, 0, windowWidth, windowHeight);
        screen.pop();
    }
    mousePressed(){
        this.startBtn.mousePressed();
        this.particles.mousePressed();
    }
    mouseDragged(){
        this.particles.mouseDragged();
    }
    mouseReleased(){
        this.particles.mousePressed();
    }
    mouseClicked(){
        this.particles.mouseClicked();
    }

}
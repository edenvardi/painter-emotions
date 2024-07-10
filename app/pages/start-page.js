
class StartPage{
    particles = new Particles();
  

    constructor(onStart){
        this.onStart = onStart;
        
        this.welcomeTxt = new EvText(windowWidth/2-200, windowHeight/2, "Welcome!", 90, BOLD, "#000000");
        this.startTxt = new EvText(0, 0,'START',40,BOLD);
        this.startBtn = new EvButton(windowWidth/2, windowHeight/2+100, 180, 50, this.startTxt, () => {
            print('start clicked')
            this.onStart();
        });
    }

    draw(){
        push();
        screen.background(PINK_COLOR);
        screen.noStroke();
        this.startBtn.draw();
        this.welcomeTxt.draw();
        this.particles.draw();
        screen.fill(0)
        screen.text('Or click and drag on the screen',windowWidth/2-90,windowHeight/2+150)
        screen.textSize(13);
        image(screen, 0, 0, windowWidth, windowHeight);
        pop();
    }
    cleanScreen(){
        screen.background(PINK_COLOR);
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

class EvTopToolbar {

    x = 20
    y = 20
    constructor(onSave, onClean, onNext , title){
        //// title
        this.titleTxt = new EvText(this.x+35, this.y+40, title, 45, BOLD, "#000000");
        
        /// save buttons
        this.onSave = onSave;
        this.saveTxt = new EvText(0, 0,'Save',20,BOLD);
        this.saveBtn = new EvButton(windowWidth - 340, this.y+20, 100, 40, this.saveTxt, () => save() );
        //// clean button
        this.onClean = onClean;
        this.cleanTxt = new EvText(0, 0,'Clean',20,BOLD);
        this.cleanBtn = new EvButton(windowWidth - 220, this.y+20, 100, 40, this.cleanTxt, () => this.onClean() );

        /// next button
        this.onNext = onNext;
        this.nextTxt = new EvText(0, 0,'Next',20,BOLD);
        this.nextBtn = new EvButton(windowWidth - 100, this.y+20, 100, 40, this.nextTxt, () => this.onNext() );        
        
    }


    draw(){
        screen.fill('#FFF859')
        screen.noStroke()
        screen.rect(50,this.y,450,53,rectCorners);  
        this.titleTxt.draw();
        this.saveBtn.draw();
        this.cleanBtn.draw();
        this.nextBtn.draw();
        
    }
    mousePressed(){
        this.nextBtn.mousePressed();
        this.saveBtn.mousePressed();
        this.cleanBtn.mousePressed();
    }
}

class EvButton{
    constructor(x, y, width, height, text, onClick){
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.text   = text;
        this.text.x = x;
        this.text.y = y;
        this.onClick = onClick;
        this.isOn = false;
        this.selectedColor = '#C4C4C4';
        this.color = '#FFF859';
        
    }

    draw(){
        screen.push();
        screen.noStroke()
        if(this.isOn){
            screen.fill(this.selectedColor);
        }else{
            screen.fill(this.color);
        }
        screen.noStroke()
        //screen.fill(this.color);
        //screen.circle(this.x, this.y, this.width);
        screen.rectMode(CENTER)
        screen.rect(this.x, this.y, this.width, this.height, 40);       
        screen.textAlign(CENTER, CENTER);
        this.text.draw();
        screen.pop()
        
    }

    isMouseOver(){
        const result =  this.x- (this.width/2) < mouseX && mouseX < this.x + (this.width/2) && 
               this.y-(this.height/2) < mouseY && mouseY < this.y + (this.height/2);

        if(result){       
            print(`${this.text.text} isMouseOver: ${result}`);
        }

        return result;       
    }
    mousePressed(){
        if(this.isMouseOver()){            
            this.onClick(this.text);
        }
    }
}

class EvCircleButton extends EvButton{
    color         = '#E94CA9';
    selectedColor = '#C4C4C4'

    draw(){
        screen.push()
        //// CIRCLE
        if(this.isOn){
            screen.fill(this.selectedColor);
        }else{
            screen.fill(this.color);
        }        
        screen.noStroke();
        screen.circle(this.x, this.y, this.width);
        //// TEXT
        screen.fill(0,0,0,0)
        screen.textAlign(CENTER, CENTER);
        this.text.draw();
        screen.pop();
    }

    
}
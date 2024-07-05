
class EvText{

    constructor(x, y, text, size,style,color){
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.size = size;
        this.style = style;
    }

    draw(){
        screen.push();
        screen.noStroke()
        screen.textSize(this.size);
        screen.textStyle(this.style);
        screen.fill(0);
        screen.text(this.text, this.x , this.y);
        screen.pop(); 
    }
}
class Toolbox{
    x = windowWidth/2;
    y = windowHeight-100



    constructor(onClick){
        let names = ['happy','sad','angry','fear','panda','joyful','lazy'];
        let dest = 120;
        this.buttons = {};
        let x = this.x - dest* (names.length-1)/2;
        this.rectWidth = names.length * 126;
        this.rectX = x-80;
        names.forEach( (name,index) => {
            this.buttons[`${name}Btn`] = new EvCircleButton( x , this.y+5, 80, 80, new EvText(0, 0,name,20), onClick );
            x += dest;
        });

        this.buttons.happyBtn.selectedColor = '#F7E232';
        this.buttons.sadBtn.selectedColor   = '#379FF5';
        this.buttons.angryBtn.selectedColor = '#FF3131';
        this.buttons.fearBtn.selectedColor  = '#D67BF0';
        this.buttons.pandaBtn.selectedColor  ='#FCA40E';
        this.buttons.joyfulBtn.selectedColor = '#7ED957';
        this.buttons.lazyBtn.selectedColor = '#F954C1';


        this.buttons.happyBtn.color         = '#ECD721';
        this.buttons.sadBtn.color           = '#0B67B3';
        this.buttons.angryBtn.color         = '#E03131';
        this.buttons.fearBtn.color          = '#B54DD3';
        this.buttons.pandaBtn.color         = '#E07606';
        this.buttons.joyfulBtn.color         = '#69BA47';
        this.buttons.lazyBtn.color          = '#E3129C';

    }

    draw(){         
        screen.push();
        screen.noStroke()
        screen.fill('#D9D9D9')
        screen.rect(this.rectX, this.y-55,this.rectWidth,120,rectCorners)
        Object.values(this.buttons).forEach(btn => btn.draw());
        screen.pop();       
    }
    mousePressed(){
        Object.keys(this.buttons).forEach(key => {
            if(this.buttons[key].isMouseOver()){
                this.buttons[key].isOn = true;
                this.buttons[key].mousePressed();
                Object.keys(this.buttons).forEach(k => {
                    if(k != key){
                        this.buttons[k].isOn = false;
                    }
                });    
            }
        });
        
    }
}
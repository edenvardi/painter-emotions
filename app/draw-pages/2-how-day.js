class BasePageBoard {
    isDrawScreen = false;
    
    constructor(onStart,title){
        this.onStart    = onStart;        
        this.topToolbar = new EvTopToolbar(() => {}, () => this.cleanBoard(), onStart, title);
        this.toolbox    = new Toolbox( this.onClickBrush.bind(this) );
        
        this.brushes = {
            happy : new HappyBrush(),
            sad   : new SadBrush(),
            angry : new AngruyBrush(),
            fear  : new FearBrush(),
            panda : new PandaBrush(),
        };
    }
    buildScreen(){
        this.isDrawScreen = true;
        screen.background(PINK_COLOR);
        this.drawBoard();
        this.topToolbar.draw();
        this.toolbox.draw();
        //image(screen, 0, 0, windowWidth, windowHeight);
    }
    draw(){
        if(!this.isDrawScreen){
            this.buildScreen();
        }

        //// screen draw
        this.toolbox.draw();
        image(screen, 0, 0, windowWidth, windowHeight);
        
        //// Brushes draw on board
        Object.values(this.brushes).forEach(brush => brush.draw());
        image(board, 50, 100);
    }
    drawBoard(){
        board.push()
        board.noStroke();
        board.fill(255);
        board.rect(0, 0, windowWidth-100, windowHeight-270, rectCorners);
        board.pop();
    }
    cleanBoard(){
        print('CLEAN BOARD');
        board.background("#FF66C4");
        board.rect(0, 0, windowWidth-100, windowHeight-200, 10);
    }
    cleanScreen(){
        screen.background(PINK_COLOR);
    }

    mousePressed(){
        this.topToolbar.mousePressed();
        this.toolbox.mousePressed();
        Object.values(this.brushes).forEach(brush => brush.mousePressed());
    }
  
    mouseReleased(){
        Object.values(this.brushes).forEach(brush => brush.mouseReleased());
    }
    mouseClicked(){
        
    }
    onClickBrush(btn){
        Object.keys(this.brushes).forEach(key => {
            if(btn.text == key){
                this.brushes[key].isSelected = true;
            } else {
                this.brushes[key].isSelected = false;
            }
        });        
    } 
}

class HowDayPage extends BasePageBoard{
  constructor(onStart) {
      super(onStart,"How was your day?");
  }

}
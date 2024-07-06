class BaseBrush {
    isSelected = false;
    isDrawing = false;
    mouseXPrev;
    mouseYPrev;
    particles = [];
    boardMouseX;
    boardMouseY;

    isMouseOver() {
        const result = 50 < mouseX && mouseX < BOARD_WIDTH + 50 &&
            100 < mouseY && mouseY < BOARD_HEIGHT + 100;
        return result;
    }

    isDraw() {
        return this.isDrawing && this.isSelected && this.isMouseOver();
    }

    updateMouseXY() {
        if (this.isMouseOver()) {
            this.boardMouseX = map(mouseX, 50, BOARD_WIDTH + 50, 0, BOARD_WIDTH);
            this.boardMouseY = map(mouseY, 100, BOARD_HEIGHT + 100, 0, BOARD_HEIGHT);
        }
    }

    clean() {
        this.particles = [];
    }

    draw() {
        if (this.isDraw()) {
            board.push();
            this.updateMouseXY()
            this.innerDraw();
            board.pop();
        }
    }

    innerDraw() {
    }

    mousePressed() {
        this.isDrawing = true;
        this.mouseXPrev = this.boardMouseX;
        this.mouseYPrev = this.boardMouseY;
    }

    mouseReleased() {
        this.isDrawing = false;
    }
}
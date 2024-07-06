class PandaBrush extends BaseBrush {
    brushSize = 50;
    brushPressure = 1.5; // Controls paint thickness

    innerDraw() {
        let dx = this.boardMouseX - this.previousX;
        let dy = this.boardMouseY - this.previousY;
        let angle = atan2(dy, dx); // Calculate direction for brush stroke
        let roughness = random(1); // Randomness for a textured look

        for (let i = 0; i < this.brushSize; i++) {
            let offsetX = random(-this.brushPressure, this.brushPressure) * roughness;
            let offsetY = random(-this.brushPressure, this.brushPressure) * roughness;
            let strokeX = this.previousX + i + offsetX;
            let strokeY = this.previousY + i + offsetY;

            board.stroke(10, 10, 10, this.brushPressure * 255); // Black with opacity based on pressure
            board.strokeWeight(1);

            board.line(strokeX, strokeY, strokeX + cos(angle), strokeY + sin(angle));
        }

        this.previousX = this.boardMouseX;
        this.previousY = this.boardMouseY;
    }
}
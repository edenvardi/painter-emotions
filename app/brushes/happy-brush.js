class HappyBrush extends BaseBrush {
    color;
    color2;

    innerDraw() {
        this.color = random(255, 230);
        this.color2 = random(255, 205);

        board.stroke(this.color, this.color2, 0, 40); // Glowing yellow line

        // stroke(255, 255, 0,40); // Glowing yellow line
        board.strokeWeight(4); // Line thickness
        // blendMode(BURN);


        // Draw snowflake pattern
        for (let i = 0; i < 6; i++) { // Number of branches
            let angle = i * 60; // Angle for each branch
            let length = random(10, 5); // Initial branch length
            this.drawBranch(this.boardMouseX, this.boardMouseY, angle, length);

        }

        this.mouseXPrev = this.boardMouseX;
        this.mouseYPrev = this.boardMouseY;
    }

    drawBranch(x, y, angle, length) {
        // Draw a line segment
        board.line(x, y, x + length * cos(angle), y + length * sin(angle));

        // Recursively draw smaller branches at the end of the line
        if (length > 2) {
            let newAngle = angle + random(-130, 230); // Add random variation to angle


            let newLength = length * random(0.7, 0.9); // Reduce branch length for recursion
            this.drawBranch(x + length * cos(angle), y + length * sin(angle), newAngle, newLength);
        }
    }
}
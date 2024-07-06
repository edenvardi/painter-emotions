class FearBrush extends BaseBrush {
    letters = "abcdefghijklmnopqrstuvwxyz"; // String of available letters
    size;
    alpha;

    innerDraw() {
        let newLetter = this.getRandomLetter();
        let newX = this.boardMouseX - 12;
        let newY = this.boardMouseY - 32;
        this.particles.push({letter: newLetter, x: newX, y: newY}); // Store letter and position

        // Draw letters along the line segments

        for (let i = 0; i < this.particles.length; i++) {
            board.textSize(random(30, 2)); // Adjust text size as needed
            board.fill(90, 49, 163, alpha); // Black color for letters
            board.noStroke()
            board.text(this.particles[i].letter, this.particles[i].x, this.particles[i].y);
        }
    }

    getRandomLetter() {
        // Choose a random letter from the string
        return this.letters[floor(random(this.letters.length))];
    }

}
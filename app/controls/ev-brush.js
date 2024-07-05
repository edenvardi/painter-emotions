class BaseBrush {
    isSelected = false;
    isDrawing = false;
    mouseXPrev;
    mouseYPrev;
    particles = [];

    isMouseOver() {
        const result = 50 < mouseX && mouseX < windowWidth - 100 &&
            100 < mouseY && mouseY < windowHeight - 300;
        return result;
    }

    isDraw() {
        return this.isDrawing && this.isSelected && this.isMouseOver();
    }

    draw() {
        if (this.isDraw()) {
            board.push();
            this.innerDraw();
            board.pop();
        }
    }

    innerDraw() {
    };

    mousePressed() {
        this.isDrawing = true;
        this.mouseXPrev = mouseX;
        this.mouseYPrev = mouseY;
    }

    mouseReleased() {
        this.isDrawing = false;
    }
}
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
            this.drawBranch(mouseX, mouseY, angle, length);

        }

        this.mouseXPrev = mouseX;
        this.mouseYPrev = mouseY;
    }

    drawBranch(x, y, angle, length) {
        // Draw a line segment
        board.line(x, y, x + length * cos(angle), y + length * sin(angle));
      
        // Recursively draw smaller branches at the end of the line
        if (length > 2) {
          let newAngle = angle + random(-130, 230); // Add random variation to angle
      
          
          
          let newLength = length * random(0.7,0.9); // Reduce branch length for recursion
          this.drawBranch(x + length * cos(angle), y + length * sin(angle), newAngle, newLength);
        }
      }
}


class SadParticle{
  gravity  = 0.15; // Gravity-like force pulling particles downwards

  constructor(x, y, velocity) {
      this.position = createVector(x, y);
      this.velocity = velocity.copy();
      this.acceleration = createVector(0, this.gravity);
      this.size = random(3, 25);
      this.lifespan = 255; // Opacity of particle
      this.color = "#08256F";
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2; // Fade out particle

    // Reset acceleration to zero each frame
    this.acceleration.mult(0);
  }

  display() {
    board.push();
    board.noStroke(); 
    // this.color = ("#08256F")    
    // fill(5, this.lifespan); 
    board.fill(this.color)   
    board.ellipse(this.position.x, this.position.y, this.size);
    board.pop();
  }

  isOffScreen() {
    return (this.position.x < 0 || this.position.x > width || this.position.y > height);
  }
}

class SadBrush extends BaseBrush{  
  sprayForce = 0.15; // Force with which particles spray out
  gravity  = 0.15; // Gravity-like force pulling particles downwards

  innerDraw() {
      // Create new particles if mouse is pressed
      if (mouseIsPressed) {
          let sprayDirection = createVector(random(-1, 1), random(-1, 0));
          sprayDirection.setMag(this.sprayForce);
          let particle = new SadParticle(mouseX, mouseY, sprayDirection);
          this.particles.push(particle);
      }

      // Update and display particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].update();
          this.particles[i].display();

          // Remove particles if they go out of bounds
          if (this.particles[i].isOffScreen()) {
              this.particles.splice(i, 1);
          }
      }    
  }
}

class AngryParticle{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-5, 5); // Random horizontal velocity
    this.vy = random(-5, 5); // Random vertical velocity
    this.alpha = 255; // Initial opacity
    this.color = color(random(0, 50), 100, 100, this.alpha); // Random color in HSB
    this.size = random(5, 15); // Random size
    this.gravity = 0.1; // Gravity-like acceleration
    this.drag = 0.90; // Air resistance
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.alpha -= 6; // Fade out over time
  }
  
  show() {
    board.push();
    board.noStroke();
    board.fill(this.color);
    board.ellipse(this.x, this.y, this.size); // Draw particle
    board.pop();
  }
  
  finished() {
    return this.alpha <= 0; // Check if particle is fully faded out
  }
}

class AngruyBrush extends BaseBrush{

  innerDraw() {
      // background(0); // Black background
      board.colorMode(HSB);
      // Add new particles when mouse is pressed
      if (mouseIsPressed) {
          for (let i = 0; i < 10; i++) {
              let p = new AngryParticle(mouseX, mouseY);
              this.particles.push(p);
          }

          // Update and display particles
          for (let i = this.particles.length - 1; i >= 0; i--) {
              this.particles[i].update();
              this.particles[i].show();

              // Remove particles if they are faded out
              if (this.particles[i].finished()) {
                  this.particles.splice(i, 1);
              }
          }
      }
   }
}
class FearBrush extends BaseBrush{
  letters = "abcdefghijklmnopqrstuvwxyz"; // String of available letters
  size;
  alpha;

  innerDraw() {
      let newLetter = this.getRandomLetter();
      let newX = mouseX - 12;
      let newY = mouseY - 32;
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

class PandaBrush extends BaseBrush{
  brushSize = 50;
  brushPressure = 1.5; // Controls paint thickness

  innerDraw() {      let dx = mouseX - this.previousX;
      let dy = mouseY - this.previousY;
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

      this.previousX = mouseX;
      this.previousY = mouseY;
  }
}
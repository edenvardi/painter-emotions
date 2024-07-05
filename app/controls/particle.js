
class Particle {
    constructor(x, y) {
          //En el constructor creamos 3 vectores: pos, vel y acc
      this.pos = createVector(x, y);
      this.vel = createVector(random(-1, 1), random(-1, 1));
      this.acc = createVector(0, 0);
          //Tambíen guardamos el límite máximo de velocidad y fuerza con la que se repele y atrae
      this.maxSpeed = random(0.5, 10);
      this.maxForce = random(0.01, 0.5);
          //Por último las variables de color y radio del círculo
      this.color = color(random(255), random(255), random(255), random(100, 255));
      this.radius = random(1, 80);
    }
  
    update(offset) {
          //Añadimos a la velocidad la aceleración que en otras funciones se está modificando pero limitandolo luego al máximo
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      //Sumamos el offset al vector de posición para crear el movimiento perlin
      this.pos.add(p5.Vector.mult(offset, 2));
      //Utilizamos la velocidad para añadirla a la posición y así actualizarla
      this.pos.add(this.vel);
      //Hacemos reset de la aceleración
      this.acc.mult(0);
      //Controlamos que las partículas no se salgan de los bordes de la pantalla
      this.edges();
    }
  
    show() {
      screen.push()    
      screen.noStroke();
      screen.fill(this.color);
      screen.ellipse(this.pos.x, this.pos.y, this.radius);
      screen.pop();
    }
  
    attracted(target) {
          //Pasamos como target la posición del mousey y calculamos mediante la distancia la fuerza a aplicar sobre la elipse
      let force = p5.Vector.sub(target, this.pos);
      let distance = force.mag();
      distance = constrain(distance, 500, 800);
      force.normalize();
      let strength = (1 / distance) * 100;
      force.mult(strength);
          //Finalmente aplicamos la fuerza calculada a la variable aceleración
      this.applyForce(force);
    }
  
    repelled(target) {
          //Aplicamos la misma función que attracted pero inviertiendo el orden en el mapeado de la distancia y en la variable strength
      let force = p5.Vector.sub(target, this.pos);
      let distance = force.mag();
      if (distance < 100) {
        distance = map(distance, 0, 100, 50, 10);
        force.normalize();
        let strength = (1 / distance) * 100;
        force.mult(-strength);
        this.applyForce(force);
      }
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    edges() {
      if (this.pos.x > width + this.radius) this.pos.x = -this.radius;
      if (this.pos.x < -this.radius) this.pos.x = width + this.radius;
      if (this.pos.y > height + this.radius) this.pos.y = -this.radius;
      if (this.pos.y < -this.radius) this.pos.y = height + this.radius;
    }
  }

class Particles {
    particles = [];
    numParticles = 1000;
    draw() {
        for (let i = 0; i < this.particles.length; i++) {
            //generamos un offset para el movimiento basado en el tiempo y la posición de la partícula
            let timer = frameCount * 0.01;
            let noiseX = noise(timer + this.particles[i].pos.x * 0.01, timer);
            let noiseY = noise(timer, timer + this.particles[i].pos.y * 0.01);
            let offset = createVector(map(noiseX, 0, 1, -1, 1), map(noiseY, 0, 1, -1, 1));
            this.particles[i].update(offset);
            this.particles[i].show();
            this.particles[i].attracted(createVector(mouseX, mouseY));
            this.particles[i].repelled(createVector(pmouseX, pmouseY));
        }
    }

    mousePressed() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].maxSpeed = random(1, 20);
            this.particles[i].maxForce = random(0.1, 1);
            this.particles[i].radius = random(5, 60);
        }
    }

    mouseDragged() {
        if (this.particles.length < this.numParticles) this.particles.push(new Particle(random(mouseX - 50, mouseX + 50), random(mouseY - 50, mouseY + 50)));
    }

    mouseReleased() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].maxSpeed = random(0.5, 10);
            this.particles[i].maxForce = random(0.01, 0.5);
            this.particles[i].radius = random(1, 30);
        }
    }

    mouseClicked() {
        for (let i = 0; i < this.particles.length; i++) {
            let distance = dist(mouseX, mouseY, this.particles[i].pos.x, this.particles[i].pos.y);
            if (distance < 100) {
                this.particles[i].radius += 10;
                this.particles[i].maxSpeed += 2;
            }
        }
    }

}  
class Attractor {
    constructor(x, y, z, sigma, beta, rho) {
        this.points = [new p5.Vector(x, y, z)];
        this.sigma = sigma ?? 10;
        this.beta = beta ?? 8/3;
        this.rho = rho ?? 28;

        this.hue = 360*Math.random();
    }

    update() {
        const pt = this.points[this.points.length - 1];
        const dt = 0.0075;

        const dx = (this.sigma*(pt.y - pt.x)) * dt;
        const dy = (pt.x*(this.rho - pt.z) - pt.y) * dt;
        const dz = (pt.x*pt.y - this.beta*pt.z) * dt;

        const newPt = new p5.Vector(pt.x + dx, pt.y + dy, pt.z + dz)
        this.points.push(newPt);

        if(this.points.length > 800)
            this.points.shift();
        
        this.hue = (this.hue + 1) % 360;
    }

    show() {
        colorMode(HSB);
        stroke(this.hue, 255, 255);
        
        beginShape();
        for(const pt of this.points)
            vertex(pt.x, pt.y, pt.z);
        endShape();
    }
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

const attractors = [
    new Attractor( 1,  1,  1),
    new Attractor( 2,  2,  0),
    new Attractor( 5, 10,  5),
    new Attractor(-4, -8,  6),
]

function keyTyped() {
    if(key === ' ')
        paused = !paused;
}

let paused = false;

function draw() {
    strokeWeight(2);
    noFill();

    colorMode(RGB);
    background(51);
    scale(10);

    for(const attractor of attractors) {
        if(!paused)
            attractor.update();
        attractor.show();
    }
}

class Behaviour {

}

class Moves extends Behaviour {
	update() {

	}
}

class Particle {
	constructor({ colour, empty, behaviours }) {
		this.color = colour
		this.empty = empty || false
		this.behaviours = behaviours || [];
	}
	
	update() {

	}
}

class Sand extends Particle {

}

class Grid {
	constructor(cols, rows, pixelWidth) {
		this.width = cols;
		this.height = rows;
		this.pixelWidth = pixelWidth;
		this.data = new Array(cols * rows).fill(backgroundColour);
	}

	draw() {
		this.data.forEach((colour, index) => {
			const x = index % this.width,
				y = floor(index / this.width);

			this.drawPixel(x, y, colour);
		});
	}

	drawPixel(x, y, colour) {
		strokeWeight(0);
		fill(colour)
		square(x * this.pixelWidth, y * this.pixelWidth, this.pixelWidth);
	}

	setIndex(i, colour) {
		this.data[i] = colour;
	}

	set(x, y, colour) {
		this.setIndex(x + y * this.width, colour);
	}
}

let grid,
	backgroundColour;

function setup() {
	backgroundColour = color(`rgb(0,0,0)`);
	grid = new Grid(80, 160, 5);
	createCanvas(grid.width * grid.pixelWidth, grid.height * grid.pixelWidth);
}

function draw() {
	background(backgroundColour);
	grid.draw();
}

function mouseDragged() {
	if(!mouseIsPressed) return;

	x = floor(mouseX / grid.pixelWidth);
	y = floor(mouseY / grid.pixelWidth);

	grid.set(x, y, color(`#ce0000`))
}

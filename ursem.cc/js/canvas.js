let startTime = Date.now();
let flock = [];
let totalBirds = 0;

let timer = setInterval(function(){
    draw();
}, 20);

function draw() {
    flock.forEach(bird => bird.draw());
}

document.addEventListener('click', evt => {
    if(evt.pageY <= window.innerHeight * 0.4){
        flock.push(new Bird(totalBirds, {x: evt.pageX, y: evt.pageY}));
        totalBirds++;
    }
});

function drawSky(hour) {

    const skies = [
        [["191621", "0%"],  ["020111", "15%"]],
        [["191621", "0%"],  ["020111", "15%"]],
        [["20202c", "0%"],  ["020111", "40%"]],
        [["3a3a52", "10%"], ["020111", "100%"]],
        [["515175", "0%"],  ["20202c", "100%"]],
        [["8a76ab", "0%"],  ["6f71aa", "20%"],  ["40405c", "100%"]],
        [["cd82a0", "0%"],  ["7072ab", "50%"],  ["4a4969", "100%"]],
        [["eab0d1", "0%"],  ["8583be", "40%"],  ["757abf", "100%"]],
        [["ebb2b1", "0%"],  ["82addb", "100%"]],
        [["F7C8AB", "0%"],  ["CFCDF8", "100%"]],
        [["FFE7C2", "0%"],  ["CAB8DA", "100%"]],
        [["FFF4C1", "0%"],  ["ACC5EB", "100%"]],
        [["FDF6D4", "0%"],  ["ABB7EB", "100%"]],
        [["FFF3B8", "0%"],  ["B6ABEB", "100%"]],
        [["FAEDAA", "0%"],  ["CAABEB", "100%"]],
        [["FCD39D", "0%"],  ["DAA2F1", "100%"]],
        [["9da671", "0%"],  ["265889", "50%"],  ["1e528e", "100%"]],
        [["e9ce5d", "0%"],  ["728a7c", "50%"],  ["1e528e", "100%"]],
        [["b26339", "0%"],  ["e1c45e", "30%"],  ["576e71", "70%"],  ["154277", "100%"]],
        [["B7490F", "0%"],  ["C5752D", "40%"],  ["4F4F47", "70%"],  ["163C52", "100%"]],
        [["8A3B12", "0%"],  ["071B26", "70%"],  ["071B26", "100%"]],
        [["2F1107", "0%"],  ["59230B", "20%"],  ["010A10", "70%"]],
        [["4B1D06", "0%"],  ["090401", "50%"]],
        [["150800", "0%"],  ["00000c", "20%"]]
    ];
    
    let now = new Date();
    if(hour == undefined){
        var hour = now.getHours();
        hour += now.getMinutes() / 60;
    }
    let lat = Math.cos((5 * (hour - 2)) / (6 * Math.PI)) * (window.innerHeight * 0.4) + (window.innerHeight * 0.4) + 30;
    let lon = (hour / 24) * window.innerWidth - 30;

    let sun = document.getElementById("sun");
    sun.style.left = lon + 'px';
    sun.style.top =  lat + 'px';

    let gradient = "radial-gradient(at " + lon + "px " + lat + "px";
    skies[Math.round(hour - 1)].forEach(gradSpec => gradient += ", #" + gradSpec[0] + " " + gradSpec[1]);

    let canvas = document.getElementById("canvas");

    if(hour > 4 && hour <= 9) {
        canvas.style.backgroundImage = gradient;
    }
    else if(hour > 9 && hour <= 17){
        canvas.style.backgroundImage = gradient;
    }
    else if(hour > 17 && hour <= 21){
        canvas.style.backgroundImage = gradient;
    }
    else {
        canvas.style.backgroundImage = gradient;
    }
    return(hour + ": " + skies[hour-1]);
}

class Bird {
    id;
    constructor(id, coords){
        this.speed = 2;
        
        this.angle = 1;
        this.frame = 0;
        this.id = id;
        this.inX = coords.x;
        this.inY = coords.y;

        if(this.inX <= (window.innerWidth * 0.4)) this.direction = 1;
        else this.direction = -1;

        let flockHTML = document.getElementById("flock");
        
        const birdSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const birdPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        birdSvg.setAttribute('id', "bird" + this.id);
        birdSvg.setAttribute('style', 'left:' + coords.x + "px; top:" + coords.y + "px;");
        birdSvg.setAttribute('width', "23.5px");
        birdSvg.setAttribute('height', "10.5px");
        birdSvg.classList.add('bird');

        birdPath.setAttribute('fill-rule', "evenodd");
        birdPath.setAttribute('stroke', "black");
        birdPath.setAttribute('fill', "black");
        birdPath.setAttribute('stroke-width', "1px");
        birdPath.setAttribute('stroke-linecap', "butt");
        birdPath.setAttribute('stroke-linejoin', "miter");
        birdPath.setAttribute('d', "M20.179,8.697 C20.179,8.697 18.168,8.178 17.308,7.65 C16.448,5.951 15.506,6.14 14.27,6.657 C12.548,7.299 12.168,8.381 10.745,8.289 C9.323,8.196 9.187,5.890 8.284,5.433 C7.382,4.976 4.938,4.619 3.362,4.617 C1.786,4.614 1.379,3.744 1.311,2.985 C1.243,2.226 1.736,1.372 3.772,1.353 C5.809,1.333 8.309,1.478 9.515,2.577 C10.720,3.675 11.124,4.506 13.206,3.393 C15.289,2.279 18.967,3.483 19.359,3.801 C19.751,4.118 21.0,5.841 21.0,5.841")

        birdSvg.appendChild(birdPath);
        flockHTML.appendChild(birdSvg);

        this.svg = birdSvg;
    }

    draw(){
        if(this.frame % 30 === 0) this.angle = (Math.round(Math.random() * 3));
        this.newx = parseFloat(this.svg.style.left) + (this.speed * this.direction); 
        this.newy = parseFloat(this.svg.style.top) + (this.speed * Math.cos(this.angle));
        if (this.newx <= -20 || this.newx >= window.innerWidth + 20 || this.newy <= -20 || this.newy >= (window.innerHeight * 0.4)) {
            flock.splice(flock.findIndex(bird => bird.id === this.id),1);
            this.svg.parentElement.removeChild(this.svg);
        }
        else {
            this.svg.style.left = this.newx + 'px';
            this.svg.style.top = this.newy + 'px';
        }
        this.frame ++;
    }
}

drawSky();
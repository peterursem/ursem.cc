/* 2020-2024 Peter Ursem */

const fireworkRocketInitVelocity = 1.5;
const fireworkRocketFlyTime = 500;

const fireworkInitVelocity = 0.5; 
const fireworkFlyTime = 1000;

const airResistance = 0.0005;
const gravity = 0.0005;
        
const randomness = 0.3;

var sky = document.createElement('div');
document.body.insertBefore(sky, document.getElementById("theSky"));
        
var rockets = []

function newFireworkRocket(x,y){
    var fireworkRocket = document.createElement("div");
    fireworkRocket.setAttribute('class','fireworkRocket');
    sky.appendChild(fireworkRocket);

    fireworkRocket.time = fireworkRocketFlyTime;

    fireworkRocket.velocity = [];
    fireworkRocket.velocity.x = 0;
    fireworkRocket.velocity.y = fireworkRocketInitVelocity;

    fireworkRocket.position = [];
    fireworkRocket.position.x = x;
    fireworkRocket.position.y = y;
    fireworkRocket.style.left = fireworkRocket.position.x + "px";
    fireworkRocket.style.top = fireworkRocket.position.y + "px";

    rockets.push(fireworkRocket);
    return fireworkRocket;
}

var fireworks = []

function newFirework(x,y,angle){
    var firework = document.createElement("div");
    firework.setAttribute('class','firework');
    sky.appendChild(firework);

    while(angle>360) angle-=360;
    while(angle<0) angle+=360;

    firework.time = fireworkFlyTime;

    firework.velocity = [];
    firework.velocity.x = fireworkInitVelocity * Math.sin(angle * Math.PI / 180) * (1 - Math.random() * randomness);
    firework.velocity.y = fireworkInitVelocity * Math.cos(angle * Math.PI /180) * (1 - Math.random() * randomness);

    firework.position = [];
    firework.position.x = x;
    firework.position.y = y;
    firework.style.left = firework.position.x + "px";
    firework.style.top = firework.position.y + "px";

    fireworks.push(firework);
    return firework;
}

function newFireworkStar(x,y)
{
    var launchAngle = 0;
    while(launchAngle < 360)
    {
        newFirework(x,y,launchAngle);
        launchAngle += 36;
    }
}

var id = setInterval(frame, 5);
var before = Date.now();

function frame() {
    var now = Date.now();
    var dTime = now - before;
    before = now;

    for(i in rockets){
        var rocket = rockets[i];
        rocket.time -= dTime;
        if(rocket.time > 0){
            rocket.position.x += rocket.velocity.x * dTime;
            rocket.position.y -= rocket.velocity.y * dTime;
            rocket.style.left = rocket.position.x + "px";
            rocket.style.top = rocket.position.y + "px";

            rocket.velocity.x -= rocket.velocity.x * airResistance * dTime;
            rocket.velocity.y -= rocket.velocity.y * airResistance * dTime + gravity * dTime;
        }
        else{
            newFireworkStar(rocket.position.x, rocket.position.y);
            rocket.parentNode.removeChild(rocket);
            rockets.splice(i, 1);
        }
    }

    for(i in fireworks){
        var firework = fireworks[i];
        firework.time -= dTime;
        if(firework.time > 0){
            if(firework.position.x > window.innerWidth){
                firework.parentNode.removeChild(firework);
                fireworks.splice(i,1);
            }
            firework.position.x += firework.velocity.x * dTime;
            firework.position.y -= firework.velocity.y * dTime;
            firework.style.left = firework.position.x + "px";
            firework.style.top = firework.position.y + "px";

            firework.velocity.x -= firework.velocity.x * airResistance * dTime;
            firework.velocity.y -= firework.velocity.y * airResistance * dTime + gravity * dTime;
        }
        else{
            firework.parentNode.removeChild(firework);
            fireworks.splice(i,1);
        }
    }
}

var fireworksEnabled = false;
document.getElementById('theSky').addEventListener("click", function(){
    if(fireworksEnabled === true) {
        newFireworkRocket(event.pageX, event.pageY+580);
        gtag('event', 'launch_firework');
    }
});

var fireworkImg = document.getElementById('frwkImg');
var fireworkToggle = document.getElementById('frwkToggle');
fireworkToggle.onclick = function(){
    switch (fireworksEnabled) {
        case true:
            fireworksEnabled = false;
            fireworkToggle.style.bottom = -2 + '%';
            fireworkImg.src = "/images/web/frwk-off.png";
            break;
        case false:
            fireworksEnabled = true;
            fireworkImg.src = "/images/web/frwk-on.png";
            fireworkToggle.style.bottom = 1 + '%';
            break;
    }
};
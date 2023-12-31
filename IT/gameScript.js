let canvasEl = document.getElementById("idCanvas");

let ctx = canvasEl.getContext("2d");

function trekant(x1,y1,x2,y2,x3,y3,farge="black",LBredde=1) {
    ctx.beginPath();
    ctx.lineWidth = LBredde;
    ctx.fillStyle = farge;
    ctx.strokeStyle = farge;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function sirkel(x1,y1,radius,fyll=false,farge="black",LBredde=1,v1=0,v2=2*Math.PI,retning=true) {
    ctx.beginPath();
    ctx.lineWidth = LBredde;
    ctx.strokeStyle = farge;
    ctx.arc(x1,y1,radius,v1,v2,retning);
    ctx.stroke();
    if (fyll) {
        ctx.fillStyle = farge;
        ctx.fill();
    }
}

function bue(x1,y1,radius,v1=0,v2=2*Math.PI,retning=true,farge="black",LBredde=1) {
    ctx.beginPath();
    ctx.lineWidth = LBredde;
    ctx.strokeStyle = farge;
    ctx.arc(x1,y1,radius,v1,v2,retning);
    ctx.stroke();
}

function tre(i,x3) {
    let faktor = faktorer[i];
    let xplace = 350;
    let yplace = 370;
   
    var grd_stamme = ctx.createLinearGradient(xplace + x3 - 1.5*faktor, 0, xplace + x3 + 2.5*faktor, 0);
    grd_stamme.addColorStop(0, "black");
    grd_stamme.addColorStop(0.5 ,"brown");
    grd_stamme.addColorStop(1, "black");
    ctx.fillStyle = grd_stamme;

    ctx.fillRect(xplace+x3-faktor,yplace-2*faktor,2*faktor,2*faktor);

    var grd_grener = ctx.createLinearGradient(xplace + x3 - 6*faktor, 0, xplace + x3 + 8*faktor, 0);
    grd_grener.addColorStop(0, "black");
    grd_grener.addColorStop(0.5 ,"green");
    grd_grener.addColorStop(1, "black");
    trekant(xplace+x3-5*faktor,yplace-2*faktor,xplace+x3+5*faktor,yplace-2*faktor,xplace+x3,yplace-5*faktor,grd_grener);
    trekant(xplace+x3-4*faktor,yplace-4*faktor,xplace+x3+4*faktor,yplace-4*faktor,xplace+x3,yplace-7*faktor,grd_grener);
    trekant(xplace+x3-3*faktor,yplace-6*faktor,xplace+x3+3*faktor,yplace-6*faktor,xplace+x3,yplace-9*faktor,grd_grener);
}

function oval_f(x,r,a,b) {
    return (b/a)*Math.sqrt(Math.pow(r*a,2)-Math.pow(x,2))
}

function oval(origox,origoy,r,a,b,farge="black",LBredde=1) {
    ctx.beginPath();
    ctx.lineWidth = LBredde;
    ctx.fillStyle = farge;
    ctx.strokeStyle = farge;

    let dx = 2*r*a/100;
    ctx.moveTo(origox+r*a,origoy);

    for (let i=1; i<=100; i++) {
        ctx.lineTo(origox+r*a-dx*i,origoy+oval_f(r*a-dx*i,r,a,b));
    }
    for (let i=99; i>0; i--) {
        ctx.lineTo(origox+r*a-dx*i,origoy-oval_f(r*a-dx*i,r,a,b));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}






let i=0;
let left = true;
let up = true;
let flyttx = 50;
let flytty = 100;
let hopp = 0;
let grense = 90;
let x3 = 100;
let antall = 5
let faktorer = [];
function velgfaktor() {
    for (let s=0; s<antall; s++) {
        faktorer.push(10*(Math.random()+1));
    }
}
velgfaktor();
let ballx = 600;
let vinkel = 0;

//Skygge
ctx.shadowBlur = 0;
ctx.shadowColor = "black";

function tegn() {
    ctx.clearRect(0,0,400,400);

    ctx.fillStyle = "azure";
    ctx.fillRect(0,0,400,400);

    //Øyebevegelse
    if (left) {
        i -= 1/10;
        if (i<-6) {
            left = false;
        }
    }
    else {
        i += 1/10;
        if (i>6) {
            left = true;
        }
    }

    //Figurbevegelse
    if (up && hopp !== 0) {
        flytty -= hopp/5;
        if (flytty < grense) {
            up = false;
        }
    }
    else if (hopp > 0) {
        flytty += hopp/5;
        if (flytty > 100) {
            flytty = 100;
            up = true;
            grense = 90;
            hopp = 0;
        }
    }

    //Tegn tre
    x3 -= 1;
    for (let k=0; k<antall; k ++) {
        ctx.shadowBlur = 5;
        ctx.shadowOffsetY = 2;
        tre(k,x3+100*k);
    }
    if (x3 < -900) {
        x3 = 100;
        faktorer = [];
        velgfaktor();
    }
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    //Tegn figur
    //Kropp
    ctx.shadowBlur = 5;
    oval(75+flyttx,170+flytty,8,6,10,"orange");
    ctx.shadowBlur = 0;
    oval(75+flyttx,170+flytty,5,6,10,"#ffb833");

    //sirkel(75+flyttx, 170+flytty,70,true,"orange");
    //sirkel(75+flyttx, 170+flytty,50,true,"#ffb833");
    
    //Hode
    ctx.shadowBlur = 3;
    sirkel(75+flyttx,70+flytty,50,true,"orange");
    ctx.shadowBlur = 0;
    //Ører
    sirkel(30+flyttx,30+flytty,20,true,"orange");
    sirkel(120+flyttx,30+flytty,20,true,"orange");
    
    //Armer 
    sirkel(20+flyttx, 150+flytty,20,true,"orange");
    sirkel(130+flyttx, 150+flytty,20,true,"orange");
    ctx.shadowBlur = 3;
    sirkel(0+flyttx, 152+flytty,20,true,"orange");
    sirkel(150+flyttx, 148+flytty,20,true,"orange");
    //Bein
    sirkel(50+flyttx, 250+flytty-2*hopp,20,true,"orange");
    sirkel(100+flyttx, 250+flytty-2*hopp,20,true,"orange");
    ctx.shadowBlur = 0;
    //Øyne
    oval(50+flyttx,60+flytty,4,3,2,"white");
    //sirkel(50+flyttx,60+flytty,10,true,"white");
    sirkel(50+flyttx,60+flytty,3,true,"blue");
    oval(100+flyttx,60+flytty,4,3,2,"white");
    //sirkel(100+flyttx,60+flytty,10,true,"white");
    sirkel(100+flyttx+i,60+flytty,3,true,"blue");
    //Nese
    sirkel(75+flyttx,70+flytty,5,true);
    //Munn
    bue(75+flyttx,75+flytty,30,Math.PI/8,7*Math.PI/8,false);
    
    //Bakke
    ctx.fillStyle = "green";
    ctx.fillRect(0,370,400,30);

    //Ball
    ballx -= 2;
    if (ballx < -100) {
        ballx = Math.random()*200+500;
    }
    //...farge for ball
    let grd = ctx.createRadialGradient(ballx+10, 330, 0, ballx+10, 330, 60);
    grd.addColorStop(0, "lightblue");
    grd.addColorStop(1, "black");

    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    sirkel(ballx,340,30,true,grd,0);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    //...hull i bowlingballen
    vinkel += 20*Math.PI/942;
    sirkel(ballx+20*Math.cos(vinkel),340-20*Math.sin(vinkel),3,true,"black");
    sirkel(ballx+25*Math.cos(vinkel+Math.PI/12),340-25*Math.sin(vinkel+Math.PI/12),2,true,"black");
    sirkel(ballx+25*Math.cos(vinkel-Math.PI/12),340-25*Math.sin(vinkel-Math.PI/12),2,true,"black");

    //Treff
    let dxh2 = Math.pow(ballx - (100+flyttx),2);
    let dxv2 = Math.pow(ballx - (50+flyttx),2);
    let dy2 = Math.pow(340 - (250+flytty-2*hopp),2);
    let disth = Math.sqrt(dxh2+dy2);
    let distv = Math.sqrt(dxv2+dy2);
    let distmin = 50;
    if (distv < distmin || disth < distmin) {
        clearInterval(spill);
        fall();
        //console.log(disth, distv);
    }

}

let spill = setInterval(tegn,10);

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        hoppfunk()
        console.log("uwu")
    }
});

canvasEl.addEventListener('click', () => hoppfunk());


function hoppfunk() {
    hopp = 4;
    grense = 20;
}

function fall() {
    ctx.clearRect(0,0,400,400);

    ctx.fillStyle = "azure";
    ctx.fillRect(0,0,400,400);

    //Øyebevegelse
    if (left) {
        i -= 1/10;
        if (i<-6) {
            left = false;
        }
    }
    else {
        i += 1/10;
        if (i>6) {
            left = true;
        }
    }

    //Figurbevegelse
    if (up && hopp !== 0) {
        flytty -= hopp/5;
        if (flytty < grense) {
            up = false;
        }
    }
    else if (hopp > 0) {
        flytty += hopp/5;
        if (flytty > 100) {
            flytty = 100;
            up = true;
            grense = 90;
            hopp = 0;
        }
    }

    //Tegn tre
    for (let k=0; k<antall; k ++) {
        ctx.shadowBlur = 5;
        ctx.shadowOffsetY = 2;
        tre(k,x3+100*k);
    }

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
                
    //Tegn figur
    //Kropp
    ctx.shadowBlur = 5;
    oval(75+flyttx,170+flytty,8,6,10,"orange");
    ctx.shadowBlur = 0;
    oval(75+flyttx,170+flytty,5,6,10,"#ffb833");

    //sirkel(75+flyttx, 170+flytty,70,true,"orange");
    //sirkel(75+flyttx, 170+flytty,50,true,"#ffb833");
    
    //Hode
    ctx.shadowBlur = 3;
    sirkel(75+flyttx,70+flytty,50,true,"orange");
    ctx.shadowBlur = 0;
    //Ører
    sirkel(30+flyttx,30+flytty,20,true,"orange");
    sirkel(120+flyttx,30+flytty,20,true,"orange");
    
    //Armer 
    sirkel(20+flyttx, 150+flytty,20,true,"orange");
    sirkel(130+flyttx, 150+flytty,20,true,"orange");
    ctx.shadowBlur = 3;
    sirkel(0+flyttx, 152+flytty,20,true,"orange");
    sirkel(150+flyttx, 148+flytty,20,true,"orange");
    //Bein
    sirkel(50+flyttx, 250+flytty-2*hopp,20,true,"orange");
    sirkel(100+flyttx, 250+flytty-2*hopp,20,true,"orange");
    ctx.shadowBlur = 0;

    //Øyne
    oval(50+flyttx,60+flytty,4,3,0.8,"white");
    //sirkel(50+flyttx,60+flytty,10,true,"white");
    sirkel(50+flyttx,60+flytty,3,true,"blue");
    oval(100+flyttx,60+flytty,4,3,2,"white");
    //sirkel(100+flyttx,60+flytty,10,true,"white");
    sirkel(100+flyttx+i,60+flytty,3,true,"blue");
    //Nese
    sirkel(75+flyttx,70+flytty,5,true);
    //Munn
    bue(75+flyttx,75+flytty+60,50,-4*Math.PI/12,-8*Math.PI/12,true);
    
    //Bakke
    ctx.fillStyle = "green";
    ctx.fillRect(0,370,400,30);

    //Ball
    //...farge for ball
    let grd = ctx.createRadialGradient(ballx+10, 330, 0, ballx+10, 330, 60);
    grd.addColorStop(0, "lightblue");
    grd.addColorStop(1, "black");

    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    sirkel(ballx,340,30,true,grd,0);

    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    sirkel(ballx+20*Math.cos(vinkel),340-20*Math.sin(vinkel),3,true,"black");
    sirkel(ballx+25*Math.cos(vinkel+Math.PI/12),340-25*Math.sin(vinkel+Math.PI/12),2,true,"black");
    sirkel(ballx+25*Math.cos(vinkel-Math.PI/12),340-25*Math.sin(vinkel-Math.PI/12),2,true,"black");

    //console.log(hopp,flytty);
    if (flytty <= 100) {
        up = false;
        setTimeout(fall,10);
    }

}
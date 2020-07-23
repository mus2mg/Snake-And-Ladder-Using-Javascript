
let grid;
let player;
let NX = 5
let NY = 6
let diceRoll = 0
let snakes
let ladders



function setup(){
    createCanvas(500,500)
    grid = new Grid(NX,NY)
    snakes = new Snakes()
    ladders = new Ladders()
    player = new Player(snakes,ladders)
}

function draw(){
    grid.draw()
    player.draw()
    fill(0)
    textSize(24)
    text("Dice : "+diceRoll,width-200,50)
}

function mousePressed(){
    diceRoll = Math.round( map( random(),0,1,1,6) )
    player.takeStep(diceRoll)
}

class Grid{
    constructor(nx,ny){
        this.nx = nx
        this.ny = ny
    }
    draw(){
        let boxWidth  = width/this.nx
        let boxHeight = height/this.ny
        let isOn = true
        for (let y = 0; y < this.ny; y++) {
            for (let x = 0; x < this.nx; x++) {
                if(isOn){
                    fill(255)
                    isOn = false;
                }else{
                    fill(150,150,0)
                    isOn = true
                }
                rect(x*boxWidth,y*boxHeight,boxWidth,boxHeight)
            }
        }

    }
}


class Player{
    constructor(snakes,ladders){
        this.x = 0
        this.y = 0
        this.isOn = true
        this.snakes = snakes
        this.ladders = ladders
    }
    draw(){
        let boxWidth  = width/NX
        let boxHeight = height/NY
        fill(255,0,0)
        let drawx;
        let drawy;
        if(this.isOn){
            drawx = this.x
        }else{
            drawx = (NX-1)-this.x
        }
        drawy = (NY-1) - this.y
        this.snakes.draw()
        this.ladders.draw()
        ellipse(drawx*boxWidth+(boxWidth/2),drawy*boxHeight+(boxHeight/2),50,50)
        if(this.x==4 && this.y==5){
            this.x = 0
            this.y = 0
            this.isOn = true
        }
    }

    async takeStep(n){
        
        for (let index = 0; index < n; index++) {
            if(this.x<NX-1){
                this.x++
            }else{
                if(this.y<NY-1){
                    this.y++
                    this.x = 0 
                    this.isOn = !this.isOn
                }
            }
            await new Promise(r => setTimeout(r, 100));
        }

        let drawx;
        let drawy;
        if(this.isOn){
            drawx = this.x
        }else{
            drawx = (NX-1)-this.x
        }
        drawy = (NY-1) - this.y

        this.snakes.list.forEach(snake => {
            if(drawx==snake.p1.x && drawy==snake.p1.y){
                drawx = snake.p2.x
                drawy = snake.p2.y
                if(this.isOn){
                    this.x = drawx
                }else{
                    this.x = (NX-1)-drawx
                }
                this.y = (NY-1) - drawy
                if(this.y%2==0){
                    this.isOn = true
                }else{
                    this.isOn = false
                }
            }
        });

        this.ladders.list.forEach(ladder => {
            if(drawx==ladder.p2.x && drawy==ladder.p2.y){
                drawx = ladder.p1.x
                drawy = ladder.p1.y
                this.x = drawx
                this.y = (NY-1) - drawy
                if(this.y%2==0){
                    this.isOn = true
                }else{
                    this.isOn = false
                }
            }
        });

        
    }

}

class Snakes{
    constructor(){
        this.list = []
    }
    draw(){
        push()
        strokeWeight(5)
        stroke(0,255,0)
        let l1 = new Line(new Point(2,0),new Point(1,2))
        this.list.push(l1)
        l1.draw()

        let l2 = new Line(new Point(4,2),new Point(2,5))
        this.list.push(l2)
        l2.draw()
        pop()

    }
}

class Ladders{
    constructor(){
        this.list = []
    }
    draw(){
        push()
        strokeWeight(5)
        stroke(0,0,255)
        let l1 = new Line(new Point(2,1),new Point(1,4))
        this.list.push(l1)
        l1.draw()

        let l2 = new Line(new Point(1,1),new Point(4,4))
        this.list.push(l2)
        l2.draw()
        pop()

    }
}




class Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}

class Line{
    constructor(p1,p2){
        this.p1 = p1
        this.p2 = p2
    }
    draw(){
        let boxWidth  = width/NX
        let boxHeight = height/NY

        line(this.p1.x*boxWidth+(boxWidth/2),this.p1.y*boxHeight+(boxHeight/2),this.p2.x*boxWidth+(boxWidth/2),this.p2.y*boxHeight+(boxHeight/2))
    
       
    }
}
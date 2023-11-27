console.log("[Vinicius Argolo] Flappy Bird")

const sprites = new Image();
sprites.src = "./assets/sprites.png"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

// [criação do pássaro]
const bird = {
    spriteX: 0,
    spriteY: 0, 
    sWidth: 34,
    sHeight: 24, 
    dx: 10, 
    dy: 50, 
    dWidth: 34, 
    dHeight: 24,
    velocity: 0,
    gravity: 0.25,
    refresh() {
        bird.velocity = bird.velocity + bird.gravity
        bird.dy = bird.dy + bird.velocity
    },
    draw() {
        ctx.drawImage(
            sprites,
            bird.spriteX, bird.spriteY, 
            bird.sWidth, bird.sHeight, 
            bird.dx, bird.dy, 
            bird.sWidth, bird.sHeight
        )
    }
}

// [criação do chão]
const base = {
    spriteX: 0,
    spriteY: 610, 
    sWidth: 224,
    sHeight: 112, 
    dx: 0, 
    dy: 388, 
    draw(){
        ctx.drawImage(
            sprites,
            base.spriteX, base.spriteY, 
            base.sWidth, base.sHeight, 
            base.dx, base.dy, 
            base.sWidth, base.sHeight
        )  
        ctx.drawImage(
            sprites,
            base.spriteX, base.spriteY, 
            base.sWidth, base.sHeight, 
            (base.dx + base.sWidth), base.dy, 
            base.sWidth, base.sHeight
        ) 
    }
}

// [criação do background]
const bg = {
    spriteX: 390,
    spriteY: 0, 
    sWidth: 276,
    sHeight: 204, 
    dx: canvas.width - 276, 
    dy: 204, 
    draw(){
        ctx.fillStyle = "#70c5ce"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(
            sprites,
            bg.spriteX, bg.spriteY, 
            bg.sWidth, bg.sHeight, 
            bg.dx, bg.dy, 
            bg.sWidth, bg.sHeight
        )  
    }
}

// [criação da mensagem inicial]

const messageGetReady = {
    spriteX: 134,
    spriteY: 0, 
    sWidth: 174,
    sHeight: 152, 
    dx: (canvas.width - 174) / 2 , 
    dy: (canvas.height - 152) / 2, 
    draw(){
        ctx.drawImage(
            sprites,
            messageGetReady.spriteX, messageGetReady.spriteY, 
            messageGetReady.sWidth, messageGetReady.sHeight, 
            messageGetReady.dx, messageGetReady.dy, 
            messageGetReady.sWidth, messageGetReady.sHeight
        )  
    }
}
let activeScreen = {}

function changeScreen(newScreen) {
    activeScreen = newScreen
}

const Screens = {
    START: {
        draw() {
            bg.draw()
            base.draw()
            bird.draw()
            messageGetReady.draw()            
        },
        keydown() {
         changeScreen(Screens.GAME)
        },
        refresh() {

        }
    }
}

Screens.GAME = {
    draw() {
        bg.draw()
        base.draw()
        bird.draw()
    },
    refresh() {
        bird.refresh()
    }
}


function loop() {
    
    activeScreen.draw()
    activeScreen.refresh()

    requestAnimationFrame(loop)
}


window.addEventListener("keydown", () => {
    if(activeScreen.keydown ){
        activeScreen.keydown() 
    }
})

changeScreen(Screens.START)
loop()

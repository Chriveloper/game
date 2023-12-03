window.addEventListener("load", function(){
  const canvas = document.getElementById("background_canvas");
  const ctx = canvas.getContext("2d")
  canvas.width = 1080;
  canvas.height = 720;


class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = new Set();

    window.addEventListener("keydown", (event) => {
      this.keys.add(event.key);
      this.handleInput();
    });

    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.key);
      this.handleInput();
    });
  }

  handleInput() {
    const player = this.game.player;
    player.speed_x = 0;
    player.speed_y = 0;

    let direction = 0;

    if ((this.keys.has("ArrowUp") || this.keys.has("ArrowDown")) && (this.keys.has("ArrowLeft") || this.keys.has("ArrowRight"))) {
      if (this.keys.has("ArrowUp") && this.keys.has("ArrowRight")) {
        direction = 2
      }
      if (this.keys.has("ArrowDown") && this.keys.has("ArrowRight")) {
        direction = 4
      }
      if (this.keys.has("ArrowUp") && this.keys.has("ArrowLeft")) {
        direction = 6
      }
      if (this.keys.has("ArrowDown") && this.keys.has("ArrowLeft")) {
        direction = 8
      }
    } else {
      if (this.keys.has("ArrowUp")) {
        direction = 1
      }
      if (this.keys.has("ArrowRight")) {
        direction = 3
      }
      if (this.keys.has("ArrowDown")) {
        direction = 5
      }
      if (this.keys.has("ArrowLeft")) {
        direction = 7
      }
    }

    switch (direction) {
      case 1 :
        player.speed_x = 0;
        player.speed_y = -2;
        break;
      case 2 :
        player.speed_x = 1;
        player.speed_y = -1;
        break;
      case 3 :
        player.speed_x = 2;
        player.speed_y = 0;
        break;
      case 4 :
        player.speed_x = 1;
        player.speed_y = 1;
        break;
      case 5 :
        player.speed_x = 0;
        player.speed_y = 2;
        break;
      case 6 :
        player.speed_x = -1;
        player.speed_y = -1;
        break;
      case 7 :
        player.speed_x = -2;
        player.speed_y = 0;
        break;
      case 8 :
        player.speed_x = -1;
        player.speed_y = 1;
        break;
    }
  }
}
  

  ctx.fillStyle = "white"
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";

  class Player {
    constructor(game, playerId) {
      this.game = game;
      this.playerId = playerId;
      this.collision_x = this.game.width * 0.5;
      this.collision_y = this.game.height * 0.5;
      this.collision_radius = 30;
      this.speed_x = 0;
      this.speed_y = 0;
      this.img = document.getElementById("hund1");
      this.img_width = 120;
      this.img_height = 90;
    }
    
    draw(context) {
      context.beginPath();
      context.arc(this.collision_x, this.collision_y, this.collision_radius, 0, Math.PI*2);
      context.globalAlpha = 0.5;
      context.fill();
      context.restore();
      context.stroke();
      context.drawImage(this.img, this.collision_x - this.img_width / 2, this.collision_y - this.img_height / 2, this.img_width, this.img_height);
    }
    
    async update() {
      this.collision_x += this.speed_x;
      this.collision_y += this.speed_y;
  
      if (this.collision_x - this.collision_radius < 0) {
        this.collision_x = this.collision_radius;
      }
      if (this.collision_x + this.collision_radius > this.game.width) {
        this.collision_x = this.game.width - this.collision_radius;
      }
      if (this.collision_y - this.collision_radius < 0) {
        this.collision_y = this.collision_radius;
      }
      if (this.collision_y + this.collision_radius > this.game.height) {
        this.collision_y = this.game.height - this.collision_radius;
      }



    }
  }
  

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);
      this.lastKey = undefined;
      this.input = new InputHandler(this);
  

    }
  
    render(context) {
      this.player.draw(context);
    }
  
    update() {
      this.player.update();

    }
  }
  
  const game = new Game(canvas);
  
  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
  
});
window.addEventListener("load", function(){
  const canvas = document.getElementById("background_canvas");
  const ctx = canvas.getContext("2d")
  canvas.width = 1080;
  canvas.height = 720;

  class InputHandler {
    constructor(game){
      this.game = game;
      window.addEventListener("keydown", function(e){
        console.log(e.key)
      })
    }
  }

  ctx.fillStyle = "white"
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";

  class Player {
    constructor(game){
      this.game = game;
      this.collision_x = this.game.width * 0.5;
      this.collision_y = this.game.height * 0.5;
      this.collision_radius = 30;
    }
    draw(context){
      context.beginPath();
      context.arc(this.collision_x, this.collision_y, this.collision_radius, 0, Math.PI*2);
      context.globalAlpha = 0.5;
      context.fill();
      context.restore();
      context.stroke();
    }
  }

  class Game {
    constructor(canvas){
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);
      this.lastKey = undefined;
      this.input = new InputHandler(this);
    }
    render(context){
      this.player.draw(context);
    }
  }


  const game = new Game(canvas);
  game.render(ctx);
  function animate(){

  }
});
class BoxGameComponent {
    box = {};
    score = document.createElement("div");
    squares = [];
    container = document.createElement('div');
    gameAreaEl = document.createElement("div");
    gamebox = {
        x: Math.floor(800 / 100),
        y: Math.floor(200 / 100)
    };
    player = {
        speed: 100,
        square: 1,
        score: 0
    };

    init = (button) => {
        this.gameAreaEl.innerHTML = '';
        this.container.innerHTML = '';
        this.score.innerHTML = '';
        document.body.appendChild(this.container);
        this.createGameAreaDom();
        this.addListeners();
        this.build();
        button.style.display = 'none';
    };

    addListeners = () => {
        document.addEventListener('DOMContentLoaded', this.build);
        document.addEventListener('keyup', function (e) {
            const allowKey = {
                37:'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };
            if(allowKey[e.keyCode]) {
                game.handleKey(allowKey[e.keyCode])
            }
        });
    };

    createGameAreaDom = () => {
        this.gameAreaEl.setAttribute("class", "gameArea");
        this.score.setAttribute("class", "score");
        this.container.appendChild(this.gameAreaEl);
        this.container.appendChild(this.score);
        this.gameAreaEl.getBoundingClientRect();
    };

    setGameArea() {
        return this.gameAreaEl.getBoundingClientRect();
    };

    makeActive = () => {
        let randomIndex = Math.floor(Math.random() * this.squares.length);

        if (randomIndex != 0 && this.player.square != randomIndex){
            this.squares[randomIndex].classList.add('active');
        } else {
            this.makeActive();
        }

    };

    handleKey = (key) => {
        let gameArea = this.setGameArea();
        if (key === 'left' && this.box.x > gameArea.left) {
            this.box.x -= this.player.speed;
            this.player.square--;
        }
        if (key === 'right' && this.box.x < gameArea.right - this.box.offsetWidth) {
            this.box.x += this.player.speed;
            this.player.square++;
        }
        if (key === 'up'&& this.box.y > gameArea.top) {
            this.box.y -= this.player.speed;
            this.player.square -= this.gamebox.x;
        }
        if (key === 'down' && this.box.y < (gameArea.bottom - this.box.offsetHeight)) {
            this.box.y += this.player.speed;
            this.player.square += this.gamebox.x;
        }
        this.box.style.left = this.box.x + 'px';
        this.box.style.top = this.box.y + 'px';

        if (!!this.squares[this.player.square].classList.contains('active')){
            this.squares[this.player.square].classList.remove('active')
            this.makeActive();
            this.player.score++;
            this.score.innerHTML = this.player.score;
        }
    };

    build = (key) => {
        let gameArea = this.setGameArea();
        this.box = document.createElement("div");
        this.box.classList.add("box");
        this.box.x = gameArea.top;
        this.box.y = gameArea.left;
        this.box.style.top = this.box.y + 'px';
        this.box.style.left = this.box.x + 'px';
        this.gameAreaEl.appendChild(this.box);
        let counter = 1;

        for(let y = 0; y < this.gamebox.y; y++){
          for(let x = 0; x < this.gamebox.x; x++){
                this.squares[counter] = document.createElement("div");
                this.squares[counter].innerHTML = counter;
                this.squares[counter].classList.add('square');
                this.gameAreaEl.appendChild(this.squares[counter]);
                counter++;
            }
         }
        this.makeActive();
    };
}
const game = new BoxGameComponent();


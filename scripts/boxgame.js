class BoxGameComponent {

    constructor(speed, square, score, x, y) {
        this.player = {
            speed: speed,
            square: square,
            score: score
        };
        this.gamebox = {
            rows: x,
            columns: y
        };
        this.box = {};
        this.gameArea = {};
        this.squares = [];
    }

    init() {
        this.prepareDom();
        this.createGameAreaDom();
        this.addListeners();
        this.build();
        [... this.paras].forEach( (el) => {
                el.getAttribute('class') === 'hide-element' ? el.setAttribute('class', '') : el.setAttribute('class', 'hide-element');
            });
    };

    prepareDom() {
        this.paras = document.getElementsByTagName('p');
        this.scoreEl = document.createElement('div');
        this.container = document.createElement('div');
        this.gameAreaEl = document.createElement('div');
        document.body.appendChild(this.container);
    }

    addListeners() {
        document.addEventListener('DOMContentLoaded', this.build);
        document.addEventListener('keyup',  (e) => {
            const allowKey = {
                'ArrowLeft': 'left',
                'ArrowUp': 'up',
                'ArrowRight': 'right',
                'ArrowDown': 'down'
            };
            if(allowKey[e.code]) {
                game.handleKey(allowKey[e.code])
            }
        });
    };

    createGameAreaDom() {
        this.gameAreaEl.setAttribute("class", "gameArea");
        this.scoreEl.setAttribute("class", "score");
        this.container.appendChild(this.gameAreaEl);
        this.container.appendChild(this.scoreEl);
        this.gameAreaEl.getBoundingClientRect();
    };

    setGameArea() {
        return this.gameAreaEl.getBoundingClientRect();
    };

    makeActive() {
        let randomIndex = Math.floor(Math.random() * this.squares.length);

        if (randomIndex !== 0 && this.player.square !== randomIndex){
            this.squares[randomIndex].classList.add('active');
        } else {
            this.makeActive();
        }
    };

    moveSquare(direction) {
        switch(direction) {
            case 'left':
                if(this.box.x > this.gameArea.left) {
                    this.box.x -= this.player.speed;
                    this.player.square--;
                }
                break;
            case 'right':
                if(this.box.x < this.gameArea.right - this.box.offsetWidth) {
                    this.box.x += this.player.speed;
                    this.player.square++;
                }
                break;
            case 'up':
                if(this.box.y > this.gameArea.top) {
                    this.box.y -= this.player.speed;
                    this.player.square -= this.gamebox.rows;
                }
                break;
            case 'down':
                if(this.box.y < (this.gameArea.bottom - this.box.offsetHeight)) {
                    this.box.y += this.player.speed;
                    this.player.square += this.gamebox.rows;
                }
                break;
        }

        this.box.style.left = this.box.x + 'px';
        this.box.style.top = this.box.y + 'px';
    }

    handleKey(key) {
        this.gameArea = this.setGameArea();

        this.moveSquare(key);

        if (!!this.squares[this.player.square].classList.contains('active')){
            this.squares[this.player.square].classList.remove('active');
            this.makeActive();
            this.player.score++;
            this.scoreEl.innerHTML = this.player.score;
        }
    };

    build() {
        let gameArea = this.setGameArea();
        this.box = document.createElement("div");
        this.box.classList.add("box");
        this.box.x = gameArea.left;
        this.box.y = gameArea.top;
        this.box.style.left = this.box.x + 'px';
        this.box.style.top = this.box.y + 'px';
        this.gameAreaEl.appendChild(this.box);
        let counter = 1;

        for(let y = 0; y < this.gamebox.columns; y++){
            for(let x = 0; x < this.gamebox.rows; x++){
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
const game = new BoxGameComponent(100, 1, 0, 8, 2);

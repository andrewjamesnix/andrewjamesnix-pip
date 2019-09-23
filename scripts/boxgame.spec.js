describe('BoxGameComponent', () => {
    const component = new BoxGameComponent(100, 1, 0, 8, 2);

    describe('Move the square - moveSquare() method', () => {
        beforeEach(() => {
            let square = document.createElement('div');
            let activeSquare = document.createElement('div');
            square.className = 'square';
            activeSquare.className = 'square active';
            component.squares = [];

            for (let i = 0; i < 16; i++) {
                if (i === 8) {
                    component.squares[i] = activeSquare;
                } else {
                    component.squares[i] = square;
                }
            }

            component.box = {
                x: 8,
                y: 8,
                offsetWidth: 100,
                offsetHeight: 100,
                style: {
                    left: '8px',
                    top: '8px'
                }
            };
            component.gameArea = {
                bottom: 208,
                height: 200,
                left: -32,
                right: 768,
                top: 8,
                width: 800,
                x: -32,
                y: 8
            };
        });

        it('the square should move to the correct position', () => {
            component.moveSquare('right');
            expect(component.player.square).toEqual(2);
            component.moveSquare('down');
            expect(component.player.square).toEqual(10);
            component.moveSquare('left');
            expect(component.player.square).toEqual(9);
            component.moveSquare('up');
            expect(component.player.square).toEqual(1);
        });
    });
});

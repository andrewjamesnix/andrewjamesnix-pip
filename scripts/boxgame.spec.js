describe('BoxGameComponent', () => {
    const component = new BoxGameComponent();
    let containerStub, gameAreaStub, scoreStub, parent;
    describe('createGameAreaDom method', () => {
        beforeEach(() => {
            containerStub = {
                id: 'container',
                children: [],
                setAttribute: sinon.stub(),
                appendChild: sinon.stub(),
                querySelectorAll: sinon.stub()
            };
            gameAreaStub = {
                class: 'gameArea',
                setAttribute: sinon.stub()
            };
            scoreStub = {
                class: 'score',
                setAttribute: sinon.stub()
            };
            component.createGameAreaDom();
        });
        it('adds correct class to the gameArea element', () => {
            containerStub.querySelectorAll.returns([gameAreaStub]);
            var expectedClass = 'gameArea';

            expect(component.gameAreaEl.className).toBe(expectedClass);
        });
        it('adds correct class to the score element', () => {
            containerStub.querySelectorAll.returns([gameAreaStub]);
            var expectedClass = 'score';

            expect(component.score.className).toBe(expectedClass);
        });
    });
    describe('build method', () => {
        beforeEach(() => {
            component.build();
        });

        it('should create the Player box and grid boxes and one to be active', () => {
            expect(component.box).toBeTruthy();
            expect(component.squares.length).toBe(17);

            let active = component.squares.find((element) => {
                if (element) {
                    return element.classList.contains('active')
                }
            });

            expect(active).toBeTruthy();
        });
    });
});

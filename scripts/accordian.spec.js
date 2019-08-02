describe('AccordianComponent', () => {
    const component = new AccordianComponent();
    describe('suffix method', () => {
        it('should return correct number suffix for 1', () => {
            let suffix = component.suffix(1);
            expect(suffix).toBe("st");
        });

        it('should return correct number suffix for 2', () => {
            let suffix = component.suffix(2);
            expect(suffix).toBe("nd");
        });

        it('should return correct number suffix for 3', () => {
            let suffix = component.suffix(3);
            expect(suffix).toBe("rd");
        });

        it('should return correct number suffix for 4', () => {
            let suffix = component.suffix(4);
            expect(suffix).toBe("th");
        });

        it('should return correct number suffix for 112', () => {
            let suffix = component.suffix(112);
            expect(suffix).toBe("th");
        });
    });

    describe(' createElement method', () => {
        it('should return a HTML Node with correct classNames', () => {
            let node = component.createElement("heading", 2);
            expect(node.className).toBe('main2 heading');
        });

        it('should return a HTML Node with correct classNames', () => {
            let node = component.createElement("content", 7);
            expect(node.className).toBe('content7 content');
        });
      });

    describe(' createDom method', () => {
        beforeAll(() => {
          component.NUMBER_OF_ITEMS = 5;
        });

        it('should return a HTML Node with correct number of nodes', () => {
            component.createDom();
            expect(component.nodeList.length).toBe(10);
            expect(component.mainEl.length).toBe(5);
            expect(component.contentEl.length).toBe(5);
        });
    });

});

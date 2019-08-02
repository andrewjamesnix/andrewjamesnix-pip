describe('TooltipComponent', () => {
    const component = new TooltipComponent();
    describe('init method', () => {
        beforeEach(() => {
            component.setupDom();
            component.container = document.createElement('DIV');
            component.container.setAttribute('id', 'container');
            const para = document.createElement('DIV');
            const tooltip = document.createElement('SPAN');
            const output = document.createElement('DIV');
            para.setAttribute('class', 'para');
            tooltip.setAttribute('class', 'tooltip');
            tooltip.setAttribute('datatoolcontent', 'some tooltip text');
            tooltip.innerText = 'this is some text';
            output.setAttribute('class', 'output');
            para.appendChild(tooltip);
            component.container.appendChild(para);
            component.container.appendChild(output);
            const tooltips = component.container.querySelectorAll('.tooltip');
            component.tooltips = tooltips;
            component.output = output;
            component.init();
        });

        it('should toggle display of output div when triggered by mouse events', () => {
            const element = component.tooltips[0];

            element.dispatchEvent(new Event('mouseover'));
            expect(component.container.querySelector('.output').style.display).toBe('block');

            element.dispatchEvent(new Event('mouseout'));
            expect(component.container.querySelector('.output').style.display).toBe('none');
        });

        it('should display correct tooltip', () => {
            const element = component.tooltips[0];

            element.dispatchEvent(new Event('mouseover'));
            expect(component.container.querySelector('.output').innerText).toBe('some tooltip text');
        });
    });
});
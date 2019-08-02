    class AccordianComponent {

    NUMBER_OF_ITEMS = 4;
    container = document.createElement('div');
    nodeList = [];

    init = () => {
        this.container.setAttribute('id', 'container');
        document.body.appendChild(this.container);
        accordian.createDom();
        accordian.addListeners();
    };

    createDom = () => {
        let headingDiv, contentDiv;
        this.nodeList = [];

        for(let i = 0; i < this.NUMBER_OF_ITEMS; i++) {
            headingDiv = this.createElement('heading', i);
            contentDiv = this.createElement('content', i);
            this.nodeList.push(headingDiv);
            this.nodeList.push(contentDiv);
        }

        this.container.innerText = '';

        for(let i = 0; i < this.nodeList.length; i++) {
            this.container.append(this.nodeList[i]);
        }

        this.mainEl =  this.container.querySelectorAll(".heading");
        this.contentEl =  this.container.querySelectorAll(".content");
    };

    createElement = (name, i) => {
        let newElement = document.createElement("div");

        if (name === 'heading') {
            newElement.setAttribute('class', 'main' + i + ' heading');
            newElement.innerText =  (i + 1) + this.suffix(i + 1) + ' Heading ';
        } else {
            newElement.setAttribute('class', 'content' + i + ' content');
            newElement.innerText =  (i + 1) + '. Lorem gypsum conut el sadat el plinky plonky ';
        }
        return newElement;
    };

    addListeners = () => {
      if (this.mainEl.length > 0) {
        this.mainEl.forEach((header, i) => {
            header.addEventListener('click', () => {
                this.removeActiveClass();
                this.contentEl[i].classList.toggle('active');
            });
        });
      }
    };

    removeActiveClass = () => {
        this.contentEl.forEach((content, i) => {
            this.contentEl[i].classList.remove('active');
        });
    };

    suffix = (num) => {
        let i = num % 10;
        let j = num % 100;

        return (i === 1 && j !== 11) ? 'st' :
            (i === 2 && j !== 12) ? 'nd' :
                (i === 3 && j!== 13 ) ? 'rd' :
                    'th';
    };
}

const accordian = new AccordianComponent();

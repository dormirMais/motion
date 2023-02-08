import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;

interface SectionContainer extends Component, Composable {
  // Component => attachTo(), removeFrom() ||||| Composable => addChild()
  setOnCloseListener(listener: OnCloseListener): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class='page'> this is page component</ul>`);
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section); // section을 item안에 넣어준다.
    item.attachTo(this.element, "beforeend"); // 만들어진 item을 element에 붙여준다. 이경우 element는 <ul>이다. ul안에 li를 넣어준다.
    item.setOnCloseListener(() => {
      // 버튼이 클리되면 실행될 remove 함수를 등록해준다.
      item.removeFrom(this.element);
    });
  }
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;
  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">X</button>
            </div>
          </li>
  `);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: Component) {
    //child는 Component를 구현하는 어떤 class든 받을 수 있다는 의미... 이 부분이 살짝 이해하기 어려웠다...
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container); //child를 container안에 집어넣어준다.
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

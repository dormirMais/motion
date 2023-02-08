import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    super(`<ul class='page'> this is page component</ul>`);
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
  }
}

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">X</button>
            </div>
          </li>
  `);
  }

  addChild(child: Component) {
    //child는 Component를 구현하는 어떤 class든 받을 수 있다는 의미... 이 부분이 살짝 이해하기 어려웠다...
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }
}

import { BaseComponent } from "../component.js";

export class PageComponent extends BaseComponent<HTMLUListElement> {
  constructor() {
    super(`<ul class='page'> this is page component</ul>`);
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}

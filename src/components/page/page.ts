import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}
type OnCloseListener = () => void;
type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable {
  // Component => attachTo(), removeFrom() ||||| Composable => addChild()
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

//=======================================================================================================

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class='page'> this is page component</ul>`);
    this.element.addEventListener("dragover", (e: DragEvent) => {
      this.onDragOver(e);
    });
    this.element.addEventListener("drop", (e: DragEvent) => {
      this.onDrop(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    console.log("onDragover");
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    console.log("onDrop");
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section); // section을 item안에 넣어준다.
    item.attachTo(this.element, "beforeend"); // 만들어진 item을 element에 붙여준다. 이경우 element는 <ul>이다. ul안에 li를 넣어준다.
    item.setOnCloseListener(() => {
      // 버튼이 클리되면 실행될 remove 함수를 등록해준다.
      item.removeFrom(this.element);
    });
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      console.log(target, state);
    });
  }
}

//=====================================================================================

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;
  constructor() {
    super(`<li draggable="true" class="page-item">
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

    this.element.addEventListener("dragstart", (e: DragEvent) => {
      this.onDragStart(e);
    });
    this.element.addEventListener("dragend", (e: DragEvent) => {
      this.onDragEnd(e);
    });

    this.element.addEventListener("dragenter", (e: DragEvent) => {
      this.onDragEnter(e);
    });
    this.element.addEventListener("dragleave", (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }
  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("stop");
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    //child는 Component를 구현하는 어떤 class든 받을 수 있다는 의미... 이 부분이 살짝 이해하기 어려웠다...
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container); //child를 container안에 집어넣어준다.
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
}

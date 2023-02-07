import { ImgaeComponent } from "./components/page/item/image.js";
import { PageComponent } from "./components/page/page.js";

class App {
  private readonly page!: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImgaeComponent(
      "image title",
      "https://picsum.photos/600/300"
    );
    image.attachTo(appRoot, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement);

/*
  type Assertion(타입표명) 타입을 강요하기 위해 사용한다.
  type assertion을 사용할 때는 위처럼 as를 사용해도 되고 <HTMLElement> sothing 이런식으로 앞에 <>를 이용해서 사용도 가능하다. 
 */

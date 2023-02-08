import { ImgaeComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImgaeComponent("image title", "https://picsum.photos/600/300");
        image.attachTo(appRoot, "beforeend");
        const video = new VideoComponent("video title", "https://www.youtube.com/watch?v=8P-EhBzjKj0");
        video.attachTo(appRoot, "beforeend");
        const note = new NoteComponent("note Title", "note Body");
        note.attachTo(appRoot, "beforeend");
        const todo = new TodoComponent("todo Title", "todo Item");
        todo.attachTo(appRoot, "beforeend");
    }
}
new App(document.querySelector(".document"));
/*
  type Assertion(타입표명) 타입을 강요하기 위해 사용한다.
  type assertion을 사용할 때는 위처럼 as를 사용해도 되고 <HTMLElement> sothing 이런식으로 앞에 <>를 이용해서 사용도 가능하다.
 */

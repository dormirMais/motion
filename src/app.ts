import { ImgaeComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent } from "./components/page/page.js";
import { Composable } from "./components/page/page.js";
import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";

class App {
  private readonly page!: Component & Composable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    // const image = new ImgaeComponent("image title", "https://picsum.photos/600/300");
    // this.page.addChild(image); // default = beforeend

    // const video = new VideoComponent("video title", "https://www.youtube.com/watch?v=8P-EhBzjKj0");
    // this.page.addChild(video);

    // const note = new NoteComponent("note Title", "note Body");
    // this.page.addChild(note);

    // const todo = new TodoComponent("todo Title", "todo Item");
    // this.page.addChild(todo);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const inputSection = new MediaSectionInput();
      dialog.attachTo(dialogRoot);

      dialog.addChild(inputSection);
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const image = new ImgaeComponent(inputSection.title, inputSection.url);
        this.page.addChild(image); // default = beforeend
        dialog.removeFrom(dialogRoot);
      });
    });

    const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
    videoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const inputSection = new MediaSectionInput();
      dialog.attachTo(dialogRoot);

      dialog.addChild(inputSection);
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const video = new VideoComponent(inputSection.title, inputSection.url);
        this.page.addChild(video); // default = beforeend
        dialog.removeFrom(dialogRoot);
      });
    });

    const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
    noteBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const inputSection = new TextSectionInput();
      dialog.attachTo(dialogRoot);

      dialog.addChild(inputSection);
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const note = new NoteComponent(inputSection.title, inputSection.body);
        this.page.addChild(note); // default = beforeend
        dialog.removeFrom(dialogRoot);
      });
    });

    const todoBtn = document.querySelector("#new-todo")! as HTMLButtonElement;
    todoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const inputSection = new TextSectionInput();
      dialog.attachTo(dialogRoot);

      dialog.addChild(inputSection);
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const todo = new TodoComponent(inputSection.title, inputSection.body);
        this.page.addChild(todo); // default = beforeend
        dialog.removeFrom(dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);

/*
  type Assertion(타입표명) 타입을 강요하기 위해 사용한다.
  type assertion을 사용할 때는 위처럼 as를 사용해도 되고 <HTMLElement> sothing 이런식으로 앞에 <>를 이용해서 사용도 가능하다. 
 */

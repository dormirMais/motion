import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent } from "./components/page/page.js";
import { Composable } from "./components/page/page.js";
import { Component } from "./components/component.js";
import { InputDialog, MediaData, TextData } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page!: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
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

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const todo = makeSection(input);
        this.page.addChild(todo); // default = beforeend
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);

/*
  type Assertion(타입표명) 타입을 강요하기 위해 사용한다.
  type assertion을 사용할 때는 위처럼 as를 사용해도 되고 <HTMLElement> sothing 이런식으로 앞에 <>를 이용해서 사용도 가능하다. 
 */

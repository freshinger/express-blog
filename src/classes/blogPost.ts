import slug from "slug";

export interface IBlogPost {
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
}

export class blogPost implements IBlogPost {
  #title: string;
  #image: string;
  #author: string;
  #createdAt: number;
  #teaser: string;
  #content: string;

  constructor(
    title: string,
    image: string,
    author: string,
    createdAt: number,
    teaser: string,
    content: string,
  ) {
    this.#title = title;
    this.#image = image;
    this.#author = author;
    this.#createdAt = createdAt;
    this.#teaser = teaser;
    this.#content = content;
  }

  toJSON() {
    return {
      title: this.#title,
      image: this.#image,
      author: this.#author,
      createdAt: this.#createdAt,
      teaser: this.#teaser,
      content: this.#content,
    };
  }

  public get title(): string {
    return this.#title;
  }

  public set title(title: string) {
    this.#title = title;
  }
  public get image(): string {
    return this.#image;
  }

  public set image(image: string) {
    this.#image = image;
  }
  public get author(): string {
    return this.#author;
  }

  public set author(author: string) {
    this.#author = author;
  }
  public get createdAt(): number {
    return this.#createdAt;
  }
  public getCreatedAtAsString(): string {
    return new Date(this.#createdAt * 1000).toLocaleString();
  }
  public getCreatedAtAsDate(): Date {
    return new Date(this.#createdAt * 1000);
  }
  public set createdAt(createdAt: number) {
    this.#createdAt = createdAt;
  }
  public get teaser(): string {
    return this.#teaser;
  }

  public set teaser(teaser: string) {
    this.#teaser = teaser;
  }
  public get content(): string {
    return this.#content;
  }

  public set content(content: string) {
    this.#content = content;
  }
}

export class blogPostWithId extends blogPost {
  readonly #id: number;
  #slug: string;
  constructor(
    title: string,
    image: string,
    author: string,
    createdAt: number,
    teaser: string,
    content: string,
    id: number,
  ) {
    super(title, image, author, createdAt, teaser, content);
    this.#id = id;
    this.#slug = slug(title);
  }

  public get id(): number {
    return this.#id;
  }
  public get slug(): string {
    return this.#slug;
  }

  public set slug(slug: string) {
    this.#slug = slug;
  }
}

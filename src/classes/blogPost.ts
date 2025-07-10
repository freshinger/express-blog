export interface IBlogPost {
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
}

export class blogPost implements IBlogPost {
  private _title: string;
  private _image: string;
  private _author: string;
  private _createdAt: number;
  private _teaser: string;
  private _content: string;

  constructor(
    title: string,
    image: string,
    author: string,
    createdAt: number,
    teaser: string,
    content: string,
  ) {
    this._title = title;
    this._image = image;
    this._author = author;
    this._createdAt = createdAt;
    this._teaser = teaser;
    this._content = content;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }
  public get image(): string {
    return this._image;
  }

  public set image(image: string) {
    this._image = image;
  }
  public get author(): string {
    return this._author;
  }

  public set author(author: string) {
    this._author = author;
  }
  public get createdAt(): number {
    return this._createdAt;
  }

  public set createdAt(createdAt: number) {
    this._createdAt = createdAt;
  }
  public get teaser(): string {
    return this._teaser;
  }

  public set teaser(teaser: string) {
    this._teaser = teaser;
  }
  public get content(): string {
    return this._content;
  }

  public set content(content: string) {
    this._content = content;
  }
}

export class blogPostWithId extends blogPost {
  private readonly _id: number;
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
    this._id = id;
  }

  public get id(): number {
    return this._id;
  }
}

import slug from "slug";

export interface IBlogPost {
  id: number;
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
  slug: string;
}

export class blogPost implements IBlogPost {
  #id: number;
  #title: string;
  #image: string;
  #author: string;
  #createdAt: number;
  #teaser: string;
  #content: string;
  #slug: string;

  constructor(
    id?: number,
    title?: string,
    image?: string,
    author?: string,
    createdAt?: number,
    teaser?: string,
    content?: string,
    slug?: string,
  ) {
    this.#id = id ?? 0;
    this.#title = title ?? "";
    this.#image = image ?? "";
    this.#author = author ?? "";
    this.#createdAt = createdAt ?? 0;
    this.#teaser = teaser ?? "";
    this.#content = content ?? "";
    this.#slug = slug ?? "";
  }

  public get id(): number {
    return this.#id;
  }

  public set id(id: number) {
    this.#id = id;
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
  public get slug(): string {
    return this.#slug;
  }

  public set slug(slug: string) {
    this.#slug = slug;
  }

  public createSlugFromTitle() {
    this.#slug = slug(this.#title);
  }
}

export class deletedBlogPost extends blogPost {
  #deletedAt: number;
  constructor(
    id?: number,
    title?: string,
    image?: string,
    author?: string,
    createdAt?: number,
    teaser?: string,
    content?: string,
    slug?: string,
    deletedAt?: number,
  ) {
    super(id, title, image, author, createdAt, teaser, content, slug);
    this.#deletedAt = deletedAt ?? 0;
  }

  public get deletedAt(): number {
    return this.#deletedAt;
  }
  public set deletedAt(deletedAt: number) {
    this.#deletedAt = deletedAt;
  }
}

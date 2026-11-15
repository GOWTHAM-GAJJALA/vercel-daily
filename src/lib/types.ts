export type Category = {
  slug: string;
  name: string;
};

export type Author = {
  name: string;
  role: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** Article body, one entry per paragraph. */
  body: string[];
  category: Category["slug"];
  author: Author;
  /** ISO 8601 timestamp. */
  publishedAt: string;
  image: {
    src: string;
    alt: string;
  };
  tags: string[];
  featured: boolean;
};

/** An article as shown in lists: everything except the full body. */
export type ArticleSummary = Omit<Article, "body">;

export type BreakingNews = {
  id: string;
  headline: string;
  articleSlug: string;
};

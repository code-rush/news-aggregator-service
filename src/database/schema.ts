import { ColumnType, Insertable, Selectable } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Database {
  articles: ArticleTable;
}

export interface ArticleTable {
  id: string;
  title: string;
  source: string;
  description: string;
  published_on: Generated<Timestamp>;
  link: string;
  state: string;
  topic: string;
  created_on: Generated<Timestamp>;
}

export type Article = Selectable<ArticleTable>;
export type NewArticle = Insertable<ArticleTable>;

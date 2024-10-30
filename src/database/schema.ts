import { ColumnType, Insertable, Selectable } from 'kysely';

export interface Database {
  articles: ArticleTable;
}

export interface ArticleTable {
  id: string; // UUID
  title: string;
  source_id: string;
  source_name: string;
  description: string;
  published_on: ColumnType<Date, string | undefined, never>;
  link: string;
}

export type Article = Selectable<ArticleTable>;
export type NewArticle = Insertable<ArticleTable>;

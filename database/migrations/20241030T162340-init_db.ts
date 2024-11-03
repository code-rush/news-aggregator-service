import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  const raw = sql`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- new articles table
    CREATE TABLE IF NOT EXISTS articles (
      id            uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
      title         text        NOT NULL,
      published_on  timestamptz NOT NULL,
      description   text,
      link          text        NOT NULL,
      source        text        NOT NULL,
      created_on    timestamptz NOT NULL DEFAULT (now() AT TIME ZONE 'utc'),
      state         text,
      topic         text
    );
  `
  await raw.execute(db)
}

export async function down(db: Kysely<any>): Promise<void> {
  const raw = sql`
    DROP TABLE IF EXISTS articles;

    DROP EXTENSION IF EXISTS "uuid-ossp";
  `
  await raw.execute(db);  
}

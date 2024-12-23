import * as path from 'path'
import { promises as fs } from 'fs'
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely'
import { run } from 'kysely-migration-cli'
import { Pool } from 'pg'

const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL
    })
  })
})

const migrationFolder = path.join(__dirname, 'migrations')

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder,
  }),
})

run(db, migrator, migrationFolder)

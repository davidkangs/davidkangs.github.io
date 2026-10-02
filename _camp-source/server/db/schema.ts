import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const shopping = sqliteTable('shopping', {
 id:text('id').primaryKey(), name:text('name').notNull(), quantity:text('quantity').notNull().default(''), note:text('note').notNull().default(''), status:text('status').notNull().default('need'), position:integer('position').notNull().default(100), updatedAt:text('updated_at').notNull()
});
export const meals = sqliteTable('meals', {
 id:text('id').primaryKey(), adults:integer('adults').notNull().default(1), choices:text('choices').notNull(), note:text('note').notNull().default(''), updatedAt:text('updated_at').notNull()
});

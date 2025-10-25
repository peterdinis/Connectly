import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm/sql';

// ========== USERS ==========
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    email: text('email').unique().notNull(),
    createdAt: text('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

// ========== PAGES ==========
export const pages = sqliteTable('pages', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }), // Ak user zmaže účet, zmažú sa aj jeho pages
    title: text('title').notNull(), // napr. "Main Page", "Portfolio", ...
    slug: text('slug').unique().notNull(), // unikátna URL (napr. "janedoe" alebo "my-links")
    description: text('description'),
    theme: text('theme').default('default'), // napr. 'dark', 'light', 'custom'
    isPublished: integer('is_published').notNull().default(0),
    createdAt: text('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

// ========== LINKS ==========
export const links = sqliteTable('links', {
    id: text('id').primaryKey(),
    pageId: text('page_id')
        .notNull()
        .references(() => pages.id, { onDelete: 'cascade' }), // Každý link patrí jednej stránke
    title: text('title').notNull(),
    url: text('url').notNull(),
    isActive: integer('is_active').notNull().default(1),
    order: integer('order').notNull().default(0),
    createdAt: text('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

import {
    pgTable,
    uuid,
    text,
    timestamp,
    boolean,
    integer,
    primaryKey,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    username: text("username").notNull().unique(),
    emailVerified: boolean("email_verified").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const passwordHashes = pgTable("password_hashes", {
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    hash: text("hash").notNull(),
    algorithm: text("algorithm").notNull().default("argon2"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({ pk: primaryKey({ columns: [t.userId] }) }));

export const tags = pgTable("tags", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull().unique(),
});

export const packages = pgTable("packages", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description").notNull(),
    ownerId: uuid("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    homepage: text("homepage"),
    repository: text("repository"),
    license: text("license"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const packageVersions = pgTable("package_versions", {
    id: uuid("id").defaultRandom().primaryKey(),
    packageId: uuid("package_id").notNull().references(() => packages.id, { onDelete: "cascade" }),
    version: text("version").notNull(),
    checksum: text("checksum").notNull(),
    fileSize: integer("file_size").notNull(),
    storagePath: text("storage_path").notNull(),
    publishedAt: timestamp("published_at").defaultNow().notNull(),
});

export const packageTags = pgTable("package_tag", {
    packageId: uuid("package_id").notNull().references(() => packages.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (t) => ({ pk: primaryKey({ columns: [t.packageId, t.tagId] }), }));

/* ----------------------------------------- */
/*                 RELATIONS                 */
/* ----------------------------------------- */

export const usersRelations = relations(users, ({ one, many }) => ({
    passwordHash: one(passwordHashes),
    packages: many(packages),
}));

export const packageRelations = relations(packages, ({ one, many }) => ({
    owner: one(users, {
        fields: [packages.ownerId],
        references: [users.id],
    }),
    versions: many(packageVersions),
    tags: many(packageTags),
}));

export const packageVersionsRelations = relations(packageVersions, ({ one }) => ({
    package: one(packages, {
        fields: [packageVersions.packageId],
        references: [packages.id],
    }),
}));

export const packageTagsRelations = relations(packageTags, ({ one }) => ({
    packages: one(packages, {
        fields: [packageTags.packageId],
        references: [packages.id],
    }),
    tag: one(tags, {
        fields: [packageTags.tagId],
        references: [tags.id],
    }),
}));

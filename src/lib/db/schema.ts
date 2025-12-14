import {
    pgTable,
    uuid,
    text,
    timestamp,
} from "drizzle-orm/pg-core"

export const packages = pgTable("packages", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
})

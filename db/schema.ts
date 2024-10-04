import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

// COURSES TABLE(LOCAL AND INTERNATIONAL LANGUAGES)
export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
    type: text("type").notNull()
});
// Many-to-many for userProgress and courses:
export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units),
}));

// UNITS TABLE
export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, {
        onDelete: "cascade"
    }).notNull(),
    order: integer("order").notNull(),
});

// Each units can only have one courses but courses can have multiple units
export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

// LESSONS TABLE
export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
});

//
export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
}));

// Challenges Enum(Types)
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST", "VOICE", "LISTIEN", "MATCH"]);

// CHALLENGES TABLE
export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade"}).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(),
});

// Challenges relations
export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lessons: one(lessons, {
     fields: [challenges.lessonId],
     references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
 }));

 // CHALLENGEOPTION TABLE
 export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
   challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade"}).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_scr"),
    audioSrc: text("audio"),
});

//Challenge Option relation
export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
     fields: [challengeOptions.challengeId],
     references: [challenges.id],
    }),
 })); 

 // Challenge Progress Table
 export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),  //TODO: Confirm this doesn't break
   challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade"}).notNull(),
   completed: boolean("completed").notNull().default(false),
});

// Challenge progress relation
export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
     fields: [challengeProgress.challengeId],
     references: [challenges.id],
    }),
 }));


// User Progress Table:
export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade"}),
    hearts:integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});

// One-to-many for userProgress and activeCourse:
export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}));


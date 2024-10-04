import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try{
        console.log("Seeding database");
        // for clearing the Database
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        //for seeding the Database
        await db.insert(schema.courses).values([
            {
                id:1,
                title: "Spanish",
                imageSrc: "/flags/es.svg",
                type: "international",
            },
            {
                id:2,
                title: "Italian",
                imageSrc: "/flags/it.svg",
                type: "international",
            },
            {
                id:3,
                title: "French",
                imageSrc: "/flags/fr.svg",
                type: "international",
            },
            {
                id:4,
                title: "Japanese",
                imageSrc: "/flags/jp.svg",
                type: "international",
            },
            {
                id:5,
                title: "Nepalese",
                imageSrc: "/flags/np.svg",
                type: "international",
            },
            {
                id:6,
                title: "Indian",
                imageSrc: "/flags/in.svg",
                type: "international",
            },
            {
                id:7,
                title: "Korean",
                imageSrc: "/flags/kr.svg",
                type: "international",
            },
            {
                id:8,
                title: "Russian",
                imageSrc: "/flags/rs.svg",
                type: "international",
            },
            {
                id:9,
                title: "American",
                imageSrc: "/flags/us.svg",
                type: "international",
            },
            {
                id:10,
                title: "Brazilian",
                imageSrc: "/flags/bz.svg",
                type: "international",
            },
            {
                id:11,
                title: "Newari",
                imageSrc: "/native/newari.png",
                type: "native",
            },
            {
                id:12,
                title: "Tamang",
                imageSrc: "/native/tamang.png",
                type: "native",
            },

        ]);

        // Inserting Uints
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1,
            },
        ]);

        //Inserting Lessons
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Noun",
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Noun",
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Noun",
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Noun",
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Noun",
            },
            {
                id: 6,
                unitId: 1,
                order: 6,
                title: "Noun",
            },
            {
                id: 7,
                unitId: 1,
                order: 7,
                title: "Noun",
            },
            {
                id: 8,
                unitId: 1,
                order: 8,
                title: "Noun",
            },
        ]);

        //Inseting the challenges for each lessons
        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is "The man"?'
            },
        ]);

        //Inerting the challenges Options for each challenges
        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3",
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/women.svg",
                correct: false,
                text: "el mujer",
                audioSrc: "/es_woman.mp3",
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "el robot",
                audioSrc: "/es_robot.mp3",
            },
        ])

        console.log("Seeding finished");
    }catch(error){
        console.log(error);
        throw new Error("Failed to seed the database");
    }
};

main();
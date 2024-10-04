// "use client"

// import { courses, userProgress } from "@/db/schema";
// import { Card } from "./card";
// import { useRouter } from "@/navigation";
// import { useTransition } from "react";
// import { upsertUserProgress } from "@/actions/user-progress";
// import { toast } from "sonner";

// type Props = {
//     courses: typeof courses.$inferSelect[];
//     activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
// };

// export const List = ({ courses, activeCourseId }: Props) => {

// const router = useRouter();
// const [pending, startTransition] = useTransition();

// const onClick = (id:number) => {
//     if(pending) return;

//     if(id == activeCourseId) {
//         return router.push("/learn");
//     }

//     startTransition(() => {
//         upsertUserProgress(id).catch(() => toast.error("Something went wrong."));
//     });
// }

//     return (
//         <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
//             {courses.map((course) =>(
//                 <Card
//                 key={course.id}
//                 id={course.id}
//                 title={course.title}
//                 imageSrc={course.imageSrc}
//                 onClick={onClick}
//                 disabled={pending}
//                 active={course.id === activeCourseId}
//                 />
//             ))}
//         </div>
//     )
// };




"use client";

import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "@/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

// Quick Sort implementation
const quickSort = (arr: typeof courses.$inferSelect[], low: number, high: number): typeof courses.$inferSelect[] => {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1); // Sort elements before partition
        quickSort(arr, pi + 1, high); // Sort elements after partition
    }
    return arr;
};

const partition = (arr: typeof courses.$inferSelect[], low: number, high: number) => {
    const pivot = arr[high]; // Choose the last element as pivot
    let i = low - 1; // Index of smaller element

    for (let j = low; j < high; j++) {
        // If current element is smaller or equal to pivot, swap it
        if (arr[j].title.toLowerCase() <= pivot.title.toLowerCase()) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
        }
    }
    // Swap the pivot element with the element at i+1
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
};

export const List = ({ courses, activeCourseId }: Props) => {

    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;

        if (id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id).catch(() => toast.error("Something went wrong."));
        });
    };

    // Sort courses using Quick Sort (case-insensitive sorting by title)
    const sortedCourses = quickSort([...courses], 0, courses.length - 1);

    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {sortedCourses.map((course) => (
                <Card
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disabled={pending}
                    active={course.id === activeCourseId}
                />
            ))}
        </div>
    );
};


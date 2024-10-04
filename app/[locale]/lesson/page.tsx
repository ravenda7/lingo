import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "@/navigation";
import { Quiz } from "./quiz";

const LessonPage = async () => {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [
        lesson,
        userProgress
    ] = await Promise.all([
        lessonData,
        userProgressData
    ]);

    if(!lesson || !userProgress) {
        redirect("/learn");
    };

    //@ts-ignore
    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;

    return(
        <Quiz
        //@ts-ignore
            initialLessonId={lesson.id}
        //@ts-ignore
            initialLessonChallenges={lesson.challenges}
        //@ts-ignore
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={null}
        />
    )
};

export default LessonPage;
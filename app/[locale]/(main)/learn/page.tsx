// import { FeedWrapper } from "@/components/feed-wrapper";
// import { StickyWrapper } from "@/components/sticky-wrapper";
// import { Header } from "./header";
// import { UserProgress } from "@/components/user-progress";
// import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
// import { redirect } from "@/navigation";
// import { Unit } from "./unit";

// const LearnPage = async () => {

//     const userProgressData = getUserProgress();
//     const courseProgressData = getCourseProgress();
//     const lessonPercentageData = getLessonPercentage();
//     const unitsData = getUnits();

//     const [
//         userProgress,
//         units,
//         courseProgress,
//         lessonPercentage,
//     ] = await Promise.all([
//         userProgressData,
//         unitsData,
//         courseProgressData,
//         lessonPercentageData,
//     ]);

//     if(!userProgress || !userProgress.activeCourse) {
//         redirect("/courses");
//     }
//     return (
//         <div className="flex flex-row-reverse gap-[48px] px-6">
//             <StickyWrapper>
//             <UserProgress
//             //@ts-ignore
//                     activeCourse={userProgress.activeCourse}
//             //@ts-ignore
//                     hearts={userProgress.hearts}
//             //@ts-ignore
//                     points={userProgress.points}
//                     hasActiveSubscription={false}
//                 />
//             </StickyWrapper>
//             <FeedWrapper>
//                 <Header
//                 //@ts-ignore 
//                 title={userProgress.activeCourse.title} 
//                 />
//                 {units.map((unit) => (
//                     <div key={unit.id} className="mb-10">
//                        <Unit
//                         id={unit.id}
//                         order={unit.order}
//                         description={unit.description}
//                         title={unit.title}
//                         lessons={unit.lessons}
//                         activeLesson={courseProgress?.activeLesson}
//                         activeLessonPercentage={lessonPercentage}
//                        />
//                     </div>
//                 ))}
//             </FeedWrapper>
//         </div>
//     )
// };

// export default LearnPage;










import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "@/navigation";
import { Unit } from "./unit";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();
    const userSubscriptionData = getUserSubscription();
    const [
        userProgress,
        units,
        courseProgress,
        lessonPercentage,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
        userSubscriptionData,
    ]);

    if(!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    // if(!courseProgress) {
    //     redirect("/courses");
    // }

    const isPro = !!userSubscription?.isActive;

    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
           <StickyWrapper>
                <UserProgress
                //@ts-ignore
                    activeCourse={userProgress.activeCourse}
                     //@ts-ignore
                    hearts={userProgress.hearts}
                     //@ts-ignore
                    points={userProgress.points}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
                {!isPro && (
                    <Promo />
                )}  
                <Quests 
                 //@ts-ignore
                points={userProgress.points} />     
           </StickyWrapper>
           <FeedWrapper>
                <Header
                 //@ts-ignore
                title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                       <Unit
                        id={unit.id}
                        order={unit.order}
                        description={unit.description}
                        title={unit.title}
                        lessons={unit.lessons}
                        activeLesson={courseProgress?.activeLesson}
                        activeLessonPercentage={lessonPercentage}
                       />
                    </div>
                ))}
           </FeedWrapper>
        </div>
    );
};
export default LearnPage
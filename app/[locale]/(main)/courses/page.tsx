// import { getCourses, getUserProgress } from "@/db/queries";
// import { List } from "./list";
// import { getTranslations } from "next-intl/server";
// import { NoData } from "./no_data";

// const CoursesPage = async() => {

//     const coursesData =  getCourses();
//     const userProgressData =  getUserProgress();

//     const [
//         courses,
//         userProgress,
//     ] = await Promise.all([
//         coursesData,
//         userProgressData,
//     ])
//     const internationalCourses = courses.filter(course => course.type === 'international');
//     const nativeCourses = courses.filter(course => course.type === 'native');


//     const t = await getTranslations("LearnPage");

//     if (courses.length === 0) {
//         return <NoData />; // Render the fallback component
//     }
//     return (
//         <div className="h-full max-w-[912px] px-3 mx-auto">
//             <h1 className="text-2xl font-bold text-neutral-700">
//                 {/* International Language Courses */}
//                 {t("international")}
//             </h1>
//             <List
//                 courses={internationalCourses}
//                 activeCourseId={userProgress?.activeCourseId}
//             />
//             <h1 className="text-2xl font-bold text-neutral-700 pt-5">
//                 {/* Native Language Courses */}
//                 {t("native")}
//             </h1>
//             <List
//                 courses={nativeCourses}
//                 activeCourseId={userProgress?.activeCourseId}
//             />
//         </div>
//     )
// };

// export default CoursesPage;










import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";
import { getTranslations } from "next-intl/server";
import { NoData } from "./no_data";

const CoursesPage = async() => {

    const coursesData =  getCourses();
    const userProgressData =  getUserProgress();

    const [
        courses,
        userProgress,
    ] = await Promise.all([
        coursesData,
        userProgressData,
    ])
    const internationalCourses = courses.filter(course => course.type === 'international');
    const nativeCourses = courses.filter(course => course.type === 'native');


    const t = await getTranslations("LearnPage");

    if (courses.length === 0) {
        return <NoData />; // Render the fallback component
    }
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                {/* International Language Courses */}
                {t("international")}
            </h1>
            <List
                courses={internationalCourses}
                activeCourseId={userProgress?.activeCourseId}
            />
            <h1 className="text-2xl font-bold text-neutral-700 pt-5">
                {/* Native Language Courses */}
                {t("native")}
            </h1>
            <List
                courses={nativeCourses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    )
};

export default CoursesPage;


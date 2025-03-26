import { Lesson } from "../Types/LessonTypes";
import { cloudStorage } from "@telegram-apps/sdk-react";
import { LESSON_PREFIX, LESSONS_IDS, LESSONS_NAMES } from "./Utils";


export function idToName(ids: string[]): string[] {
    if (ids[0] == '') return [LESSON_PREFIX + '0']

    let result: string[] = []

    ids.forEach((id) => {
        result.push(LESSON_PREFIX + id)
    })

    return result
}

export async function getLessons(): Promise<Lesson[]> {
    let lessons: Lesson[] = []

    const data = await cloudStorage.getItem([LESSONS_NAMES, LESSONS_IDS])

    if (data.lessons_names =='') return []

    const lessons_names = data.lessons_names.split(',')

    const lessons_ids = data.lessons_ids.split(',')
    const lessons_marks = await cloudStorage.getItem(idToName(lessons_ids))
    
    lessons_names.map((name, index) => {
        const marks = lessons_marks[LESSON_PREFIX + lessons_ids[index]]
        lessons.push(
            {
                lesson_name: name,
                id: Number(lessons_ids[index]),
                marks: marks == '' ? [] : marks.split(',')
            }
        )
    })

    return lessons
}

export async function addLesson(name: string) {    
    const data = await cloudStorage.getItem([LESSONS_NAMES, LESSONS_IDS])
    let lessons_names = data.lessons_names
    let lessons_ids = data.lessons_ids.split(',')

    lessons_names += lessons_names == '' ? name : ',' + name

    if (data.lessons_ids == '') lessons_ids = ['0']
 
    else lessons_ids.push((Number(lessons_ids[lessons_ids.length - 1]) + 1).toString())

    await cloudStorage.setItem(LESSONS_NAMES, lessons_names)
    await cloudStorage.setItem(LESSONS_IDS, lessons_ids.join(','))
}

export async function removeLesson(lessons_id: number) {
    const data = await cloudStorage.getItem([LESSONS_NAMES, LESSONS_IDS])
    var newLessonsNames = data.lessons_names.split(',')
    var newLessonsIds = data.lessons_ids.split(',')

    const lesson_index = newLessonsIds.indexOf(lessons_id.toString())

    newLessonsNames.splice(lesson_index, 1)
    newLessonsIds.splice(lesson_index, 1)

    await cloudStorage.setItem(LESSONS_NAMES, newLessonsNames.join(','))
    await cloudStorage.setItem(LESSONS_IDS, newLessonsIds.join(','))

    await cloudStorage.deleteItem(LESSON_PREFIX + lessons_id)

}

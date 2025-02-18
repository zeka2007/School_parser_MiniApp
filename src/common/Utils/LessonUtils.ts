import { CloudStorage, useCloudStorage } from "@tma.js/sdk-react";
import { Lesson } from "../Types/LessonTypes";
import { getMarksList } from "./MarksUtils";

const LESSONS_NAMES = 'lessons_names'
const LESSONS_IDS = 'lessons_ids'
const LESSON_PREFIX = 'lesson_'

export function idToName(ids: string[]): string[] {
    if (ids[0] == '') return [LESSON_PREFIX + '0']

    let result: string[] = []

    ids.forEach((id) => {
        result.push(LESSON_PREFIX + id)
    })

    return result
}

export class LessonUtils {
    cloudStorage: CloudStorage

    constructor(cloudStorage: CloudStorage) {
        this.cloudStorage = cloudStorage
    }

    async addLesson(name: string) {    
        const data = await this.cloudStorage.get([LESSONS_NAMES, LESSONS_IDS])
        let lessons_names = data.lessons_names
        let lessons_ids = data.lessons_ids.split(',')
    
        lessons_names += lessons_names == '' ? name : ',' + name

        if (data.lessons_ids == '') lessons_ids = ['0']
     
        else lessons_ids.push((Number(lessons_ids[lessons_ids.length - 1]) + 1).toString())
    
        await this.cloudStorage.set(LESSONS_NAMES, lessons_names)
        await this.cloudStorage.set(LESSONS_IDS, lessons_ids.join(','))
    }

    async getLessons(): Promise<Lesson[]> {
        let lessons: Lesson[] = []

        const data = await this.cloudStorage.get([LESSONS_NAMES, LESSONS_IDS])

        if (data.lessons_names =='') return []

        const lessons_names = data.lessons_names.split(',')

        const lessons_ids = data.lessons_ids.split(',')
        const lessons_marks = await this.cloudStorage.get(idToName(lessons_ids))
        
        lessons_names.map((name, index) => {
            const marks = lessons_marks[LESSON_PREFIX + lessons_ids[index]]
            lessons.push(
                {
                    lesson_name: name,
                    marks: marks == '' ? [] : marks.split(',')
                }
            )
        })

        return lessons
    }
}


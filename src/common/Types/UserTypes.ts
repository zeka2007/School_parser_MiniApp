import { BestLesson, Lesson } from "./LessonTypes"


export interface StudentData {
    lessons: Lesson[],
    average_mark?: number,
    most_common?: string,
    marks_count?: number,
    best_lesson?: BestLesson
}

export interface TransferData {
    lessons: [Lesson]
}
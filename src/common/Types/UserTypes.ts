import { BestLesson, Lesson } from "./LessonTypes"

export interface User {
    type: 'Виртуальный дневник' | 'SCHOOLS.BY'
    description: string,
    quarter: number,
    main_now: boolean,
    diary_id: number,
    is_login_date_saved?: boolean
}

export interface StudentData {
    user: User,
    lessons: Lesson[],
    average_mark?: number,
    most_common?: string,
    marks_count?: number,
    best_lesson?: BestLesson
}

export interface TransferData {
    user: User,
    lessons: [Lesson]
}
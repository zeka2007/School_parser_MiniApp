
export interface LoginData {
    login: string,
    password: string,
    saveData: boolean
}

export interface User {
    type: 'Виртуальный дневник' | 'SCHOOLS.BY'
    description: string,
    quarter: number,
    main_now: boolean,
    diary_id: number,
    is_login_date_saved?: boolean
}

export interface Mark {
    first_value: number | null,
    second_value: number | null,
    display_value: string | null,
    attached_to_lesson: number,
    date: string,
    _id: number,
}
export interface Lesson {
    lesson_name: string,
    marks: Mark[]
}

export interface BestLesson {
    lesson: string, 
    average_mark: number
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
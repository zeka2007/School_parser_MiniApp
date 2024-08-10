
export interface LoginData {
    login: string,
    password: string,
    saveData: boolean
}

export interface User {
    student_id: number,
    quarter: number
}

export interface Mark {
    first_value: number,
    second_value?: number,
    date: string
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
    lessons: [Lesson],
    average_mark?: number,
    most_common?: string,
    marks_count?: number,
    best_lesson?: BestLesson
}

export interface TransferData {
    user: User,
    lessons: [Lesson]
}
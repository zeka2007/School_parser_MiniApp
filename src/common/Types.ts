
export interface LoginData {
    login: string,
    password: string,
    saveData: boolean
}


export interface DiaryData {
    type: 'Виртуальный дневник' | 'SCHOOLS.BY',
    name: string,
    id: number
}

export interface DiaryCreate {
    name: string,
    extend?: {
        type: string | null,
        id: number
    }
}

export interface User {
    type: 'Виртуальный дневник' | 'SCHOOLS.BY'
    description: string,
    quarter: number,
    main_now: boolean,
    diary_id: number
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
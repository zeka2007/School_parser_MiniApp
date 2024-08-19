export interface LessonUpdate {
    id: number
    attached_to: number
    fields: any
}

export interface LessonCreate {
    diary_id: number,
    name: string
}

export interface LessonData {
    id: number
    name: string
    attached_to_diary: number
}

export interface DeleteLessonData {
    id: number
    diary_id: number
}
export interface MarkCreate {
    first_value?: number | null
    second_value?: number | null
    display_value?: string | null
    quarter: number
    diary_id: number
    attached_to_lesson: number
    date: string
}

export interface UpdateMarkData {
    id: number
    data: MarkCreate
}

export interface DeleteMarkData {
    diary_id: number
    lesson_id: number
    mark_ids?: number[]
}

export interface FixMark {
    mark: number
    count: number
}

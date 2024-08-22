export interface Quarter {
    lesson_name: string
    mark: number | string
}

export interface QuarterCompare {
    lesson_name: string
    first_mark: number | string
    second_mark: number | string
    result_symbol?: '+' | '-'
    result?: number
}
export interface SingleMark {
    value: number
}

export interface SplitMark {
    first_value: number 
    second_value: number
}
export interface FixMark {
    mark: number
    count: number | undefined
}

export interface MarkWithID {
    id: string
    value: string
}
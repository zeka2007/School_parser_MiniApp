export interface ReportData {
    type: 'Виртуальный дневник' | 'SCHOOLS.BY'
    id: number
    quarters: number[]
}

export interface DiaryData {
    type: 'Виртуальный дневник' | 'SCHOOLS.BY'
    name: string
    id: number
    is_main: boolean
}

export interface DeleteDiary {
    type: 'Виртуальный дневник' | 'SCHOOLS.BY'
    id: number
}

export interface DiaryCreate {
    name: string,
    extend?: {
        type: string | null,
        id: number
    }
}

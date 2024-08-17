import axios from "axios"
import { DiaryCreate, DiaryData } from "../Types"
import { Popup } from "@tma.js/sdk-react"
import { Mutation, UseMutationResult } from "react-query"

export function convertType(type: 'Виртуальный дневник' | 'SCHOOLS.BY'): number {
    switch (type) {
        case 'SCHOOLS.BY':
            return 0
        case "Виртуальный дневник":
        return 1
    }
}

export const deleteDiaryDialog = async (popup: Popup, mutation: UseMutationResult, data: DiaryData) => {
    popup.open(
        {
            title: 'Удалить денвник?',
            message: 'Это действие нельзя отменить',
            buttons: [
                {id: 'cancel', type: 'cancel'},
                {id: 'delete', type: 'destructive', text: 'Удалить'}
            ]
        }
    ).then(
        btnId => {
            if (btnId == 'delete') mutation.mutate(
                {
                    type: data.type,
                    id: data.id
                }
            )
        }
    )
}


export const getDiaries = async (initDataRaw: string | undefined): Promise<DiaryData[]> => {
    const { data } = await axios.get('http://localhost:5000/api/diary/get-all/',
      {
        headers: {
          'Authorization': initDataRaw
        }
      }
    )
    return data
  }

export async function createDiary (sendData: DiaryCreate, initDataRaw: string | undefined) {
    const { data } = await axios.post('http://localhost:5000/api/diary/create/', sendData,
    {
        headers: {
        'Authorization': initDataRaw
        }
    }
    )
    return data
}

export async function deleteDiary (sendData: any, initDataRaw: string | undefined) {
    const { data } = await axios.post('http://localhost:5000/api/diary/delete/', sendData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data

}

export async function updateDiary (sendData: any, initDataRaw: string | undefined) {
    const { data } = await axios.post('http://localhost:5000/api/diary/update/', sendData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data
}
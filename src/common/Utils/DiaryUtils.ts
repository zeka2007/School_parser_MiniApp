import axios from "axios"
import { DeleteDiary, DiaryCreate, DiaryData } from "../Types/DiaryTypes"
import { Popup } from "@tma.js/sdk-react"
import { UseMutationResult } from "react-query"
import { Quarter } from "../Types/QuarterTypes"
import { ReportData } from "../Types/DiaryTypes"

export function convertType(type: 'Виртуальный дневник' | 'SCHOOLS.BY'): number {
    switch (type) {
        case 'SCHOOLS.BY':
            return 0
        case "Виртуальный дневник":
        return 1
    }
}

export function getMainDiary(diaries: DiaryData[]): DiaryData | undefined {
    for (let index = 0; index < diaries.length; index++) {
        if (diaries[index].is_main) return diaries[index]
    }
}

export const deleteDiaryDialog = async (popup: Popup, mutation: UseMutationResult<any, unknown, DeleteDiary, unknown>, data: DeleteDiary) => {
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

export const deleteAllDiariesDialog = async (popup: Popup, mutation: UseMutationResult<any, unknown, void, unknown>) => {
    popup.open(
        {
            title: 'Удалить все дневники?',
            message: 'Это действие нельзя отменить',
            buttons: [
                {id: 'cancel', type: 'cancel'},
                {id: 'delete', type: 'destructive', text: 'Удалить'}
            ]
        }
    ).then(
        btnId => {
            if (btnId == 'delete') mutation.mutate()
        }
    )
}

export const deleteDiaryLoginDataDialog = async (popup: Popup, mutation: UseMutationResult<any, unknown, number, unknown>, diary_id: number) => {
    popup.open(
        {
            title: 'Удалить логин и пароль?',
            message: 'Данные о логине и пароле от вашего дневника будут удалены из базы данных бота. Это не повлияет на работу с дневником.',
            buttons: [
                {id: 'cancel', type: 'cancel'},
                {id: 'delete', type: 'destructive', text: 'Удалить'}
            ]
        }
    ).then(
        btnId => {
            if (btnId == 'delete') mutation.mutate(diary_id)
        }
    )
}

export const getQuarterData = async (initDataRaw: string | undefined, params: URLSearchParams): Promise<Quarter[]> => {
    const {data} = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/api/diary/get-quarter/?${params.toString()}`, {headers: {
      'Authorization': initDataRaw
    }})

    return data;
}

export const getDiaries = async (initDataRaw: string | undefined): Promise<DiaryData[]> => {
    const { data } = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/api/diary/get-all/`,
      {
        headers: {
          'Authorization': initDataRaw
        }
      }
    )
    return data
  }

export async function createDiary (sendData: DiaryCreate, initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/diary/create/`, sendData,
    {
        headers: {
        'Authorization': initDataRaw
        }
    }
    )
    return data
}

export async function deleteDiary (sendData: DeleteDiary, initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/diary/delete/`, sendData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data

}

export async function deleteDiaryLoginData (diary_id: number, initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/diary/delete-login-data/`, {diary_id: diary_id},
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data

}

export async function deleteAllDiaries (initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/diary/delete-all/`, {},
        {
          headers: {
              'Authorization': initDataRaw
          }
        }
    )
    return data
  
  }

export async function updateDiary (sendData: any, initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/diary/update/`, sendData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data
}


export async function createReport (sendData: ReportData, initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/diary/report/create/`, sendData,
    {
        headers: {
        'Authorization': initDataRaw
        }
    }
    )
    return data
}
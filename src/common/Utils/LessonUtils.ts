import axios from "axios"
import { Popup } from "@tma.js/sdk-react"
import { UseMutationResult } from "react-query"
import { DeleteLessonData, LessonCreate, LessonData, LessonUpdate } from "../Types/LessonTypes"


export const deleteLessonDialog = async (popup: Popup, mutation: UseMutationResult<any, unknown, DeleteLessonData, unknown>, data: DeleteLessonData) => {
    popup.open(
        {
            title: 'Удалить предмет?',
            message: 'Это действие нельзя отменить',
            buttons: [
                {id: 'cancel', type: 'cancel'},
                {id: 'delete', type: 'destructive', text: 'Удалить'}
            ]
        }
    ).then(
        btnId => {
            if (btnId == 'delete') mutation.mutate(data)
        }
    )
}

export async function deleteLesson (sendData: DeleteLessonData, initDataRaw: string | undefined) {
    const { data } = await axios.post('http://localhost:5000/api/lesson/delete/', sendData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data

}


export const getLessons = async (initDataRaw: string | undefined, diary_id: number): Promise<LessonData[]> => {
    const { data } = await axios.get(`http://localhost:5000/api/lesson/get-all/?diary_id=${diary_id}`,
      {
        headers: {
          'Authorization': initDataRaw
        }
      }
    )
    return data
  }

export async function createLesson (sendData: LessonCreate, initDataRaw: string | undefined) {
    const { data } = await axios.post('http://localhost:5000/api/lesson/create/', sendData,
    {
        headers: {
        'Authorization': initDataRaw
        }
    }
    )
    return data
}

export async function updateLesson (sendData: LessonUpdate, initDataRaw: string | undefined) {
    const { data } = await axios.post('http://localhost:5000/api/lesson/update/', sendData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data
}
import axios from "axios";
import { DeleteMarkData, Mark, MarkCreate, UpdateMarkData } from "../Types/MarkTypes";
import { Popup } from "@tma.js/sdk-react";
import { UseMutationResult } from "react-query";
import { BestLesson, Lesson } from "../Types/LessonTypes";

export const marksList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'н.', 'осв.']

export function calculateSumAndCount(marks?: Mark[]): {sum: number, length: number} {
    if (!marks) return {sum: 0, length: 0}
    var sum = 0;
    var length = 0;
    marks.forEach((mark) => {
        if (mark.first_value != null) {sum += mark.first_value; length++;}
        if (mark.second_value != null) {
            sum += mark.second_value
            length++
        }
    })
    return {'sum': sum, 'length': length}
}


export function getMarksList(marks: Mark[]): number[] {
        var result: number[] = [];
        marks.forEach((mark) => {
            if (mark.first_value != null)result.push(mark.first_value)
            if (mark.second_value != null) result.push(mark.second_value)
        })
        return result
    }

export function calculateAverage(marks: Mark[]): string {
    const result = calculateSumAndCount(marks)
    return (result.sum / result.length).toFixed(2)
}

export function getMarkString(mark: Mark): string | undefined {
    return mark.first_value == null ? mark.display_value?.toString() : (mark.second_value == null ? mark.first_value : mark.first_value + "/" + mark.second_value).toString()
}

export function getBestLesson(lessons: Lesson[]): BestLesson {

    let best_lesson: string = ''
    let best_lesson_average_mark: number = 0
    lessons.map((lesson) => {
        const data = calculateSumAndCount(lesson.marks)
        const aver = data.sum / data.length
        if (best_lesson_average_mark < aver) {
            best_lesson_average_mark = aver
            best_lesson = lesson.lesson_name
        }

    })

    return {lesson: best_lesson, average_mark: best_lesson_average_mark}
}
    
export function getMarksCount(marks: [Mark[], Mark[], Mark[], Mark[]]): number {
    let sum = 0;
    marks.forEach(element => sum += element.length);
    return sum
}

export async function createMark (sendData: MarkCreate, initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/mark/create/`, sendData,
    {
        headers: {
        'Authorization': initDataRaw
        }
    }
    )
    return data
}

export const deleteLessonMarksDialog = async (popup: Popup, mutation: UseMutationResult<any, unknown, DeleteMarkData, unknown>, data: DeleteMarkData, marks_count?: number) => {
    popup.open(
        {
            title: 'Стереть все отметки?',
            message: `Все отметки ${marks_count != undefined ? `(${marks_count})` : ''} будут удалены. Это действие нельзя отменить`,
            buttons: [
                {id: 'cancel', type: 'cancel'},
                {id: 'delete', type: 'destructive', text: 'Стереть'}
            ]
        }
    ).then(
        btnId => {
            if (btnId == 'delete') mutation.mutate(data)
        }
    )
}

export const showDeleteTemporaryMarkDialog = async (popup: Popup, callback: CallableFunction = () => {}) => {
    popup.open(
        {
            message: `Удалить отметку?`,
            buttons: [
                {id: 'cancel', type: 'default', text: 'Нет'},
                {id: 'delete', type: 'destructive', text: 'Да'}
            ]
        }
    ).then(
        btnId => {
            if (btnId == 'delete') callback()
        }
    )
}

export const deleteOneMarkDialog = async (popup: Popup, mutation: UseMutationResult<any, unknown, DeleteMarkData, unknown>, data: DeleteMarkData) => {
    popup.open(
        {
            title: 'Удалить отметку',
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

export async function deleteMarks (sendData: DeleteMarkData, initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/mark/delete/`, sendData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data
}

export async function updateMark (sendData: UpdateMarkData, initDataRaw: string | undefined) {
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/mark/update/`, sendData,
        {
        headers: {
            'Authorization': initDataRaw
        }
        }
    )
    return data
}

export const getMarks = async (initDataRaw: string | undefined, params: URLSearchParams): Promise<Mark[]> => {
    const { data } = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/api/mark/get-all/?${params.toString()}`,
      {
        headers: {
          'Authorization': initDataRaw
        }
      }
    )
    return data
  }



import { BestLesson, Lesson } from "../Types/LessonTypes";
import { cloudStorage } from "@telegram-apps/sdk-react";
import { LESSON_PREFIX } from "./Utils";
import { MinMaxMarkData } from "../Types/UserTypes";

export function getSessionMarksData(): MinMaxMarkData {
    return JSON.parse(sessionStorage.getItem('min_max_mark') ?? '{"min_mark": 0, "max_mark": 0}')
}

export function getConstMarksList(): number[] {
    const data: MinMaxMarkData = getSessionMarksData()
    const length = data.max_mark - data.min_mark + 1;
    const arr = Array.from({ length: length }, (_, index) => data.min_mark + index);
    return arr
}


export function calculateSum(marks?: number[]): number {
    var sum = 0;
    marks?.forEach((mark) => {
        sum += mark
    })
    return sum
}


export function getMarksList(marks: string[]): number[] {
    var result: number[] = [];
    marks.forEach((mark) => {
        if (mark.includes('/')) {
            const splted = mark.split('/')
            result.push(Number(splted[0]), Number(splted[1]))
        }
        else result.push(Number(mark))
    })
    return result
}

export function getMarksFromLessons(lessons: Lesson[]): number[] {
    var result: number[] = [];
    lessons.forEach((lesson) => {
        result.push(...getMarksList(lesson.marks))
    })
    return result
}

export function calculateAverage(marks: number[]): string {
    const sum = calculateSum(marks)
    return (sum / marks.length).toFixed(2)
}


export function getBestLesson(lessons: Lesson[]): BestLesson {

    let best_lesson: string = ''
    let best_lesson_average_mark: number = 0
    lessons.map((lesson) => {
        const marks = getMarksList(lesson.marks)
        const sum = calculateSum(marks)
        const aver = sum / marks.length
        if (best_lesson_average_mark < aver) {
            best_lesson_average_mark = aver
            best_lesson = lesson.lesson_name
        }

    })

    return { lesson: best_lesson, average_mark: best_lesson_average_mark }
}

export async function getMarksFromLesson(lesson_id: number) {
    const marks = await cloudStorage.getItem([LESSON_PREFIX + lesson_id])
    const marksStr = marks[LESSON_PREFIX + lesson_id]
    return marksStr != '' ? marksStr.split(',') : []
}

export async function addMark(lesson_id: number, mark: string) {
    var marks = await cloudStorage.getItem([LESSON_PREFIX + lesson_id])
    var marksStr = marks[LESSON_PREFIX + lesson_id]
    if (marksStr != '') {
        let marksList = marksStr.split(',')
        marksList.push(mark)
        await cloudStorage.setItem(LESSON_PREFIX + lesson_id, marksList.join(','))
    }
    else await cloudStorage.setItem(LESSON_PREFIX + lesson_id, mark)
}

export async function editMark(lesson_id: number, mark_index: number, new_mark: string) {
    var marks = await cloudStorage.getItem([LESSON_PREFIX + lesson_id])
    var marksList = marks[LESSON_PREFIX + lesson_id].split(',')

    marksList[mark_index] = new_mark

    await cloudStorage.setItem(LESSON_PREFIX + lesson_id, marksList.join(','))
}

export async function deleteMark(lesson_id: number, mark_index: number | number[]) {
    var marks = await cloudStorage.getItem([LESSON_PREFIX + lesson_id])
    var marksList = marks[LESSON_PREFIX + lesson_id].split(',')

    if (Array.isArray(mark_index)) 
        await cloudStorage.setItem(LESSON_PREFIX + lesson_id, marksList.filter((_, index) => !mark_index.includes(index)).join(','))
    else await cloudStorage.setItem(LESSON_PREFIX + lesson_id, marksList.filter((_, index) => index != mark_index).join(','))
}


export async function removeAllMarksFromLesson(lessons_id: number) {
    await cloudStorage.deleteItem(LESSON_PREFIX + lessons_id)
}

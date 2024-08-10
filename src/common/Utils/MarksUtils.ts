import { BestLesson, Lesson, Mark } from "../Types";


export function calculateSumAndCount(marks: Mark[]): {sum: number, length: number} {
    var sum = 0;
    var length = 0;
    marks.forEach((mark) => {
        sum += mark.first_value
        length++
        if (mark.second_value != undefined) {
        sum += mark.second_value
        length++
        }
    })
    return {'sum': sum, 'length': length}
}


export function getMarksList(marks: Mark[]): number[] {
        var result: number[] = [];
        marks.forEach((mark) => {
            result.push(mark.first_value)
            if (mark.second_value != undefined) result.push(mark.second_value)
        })
        return result
    }

export function calculateAverage(marks: Mark[]): string {
    const result = calculateSumAndCount(marks)
    return (result.sum / result.length).toFixed(2)
}

export function getMarkString(mark: Mark): string {
    return mark.second_value == undefined ? `${mark.first_value}` : mark.first_value + "/" + mark.second_value
}

export function getBestLesson(lessons: [Lesson]): BestLesson {

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
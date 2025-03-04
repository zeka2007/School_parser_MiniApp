import { FC, useContext } from "react";

import './IndexPage.css'
import { Button, Modal } from "@telegram-apps/telegram-ui";
import { calculateAverage, getMarksFromLessons } from "@/common/Utils/MarksUtils";
import { PlatformContext } from "@/components/App";
import { AddMarkByLesson } from "../MarksPage/AddMark";
import { Lesson } from "@/common/Types/LessonTypes";

const MarksData : FC<{marks: number[]}> = ({marks}) => {
    return (
        <div className="header-text">
            <span className="mark-text">{calculateAverage(marks)}</span>
            <br/>
            <span className="subtitle">Средний балл</span>
        </div>
    )
}

const NoMarks : FC = () => {
    return (
        <div className="header-text">
            <span className="mark-text no-marks-text">Отметок нет</span>
            <br/>
            <span className="subtitle">Нажмите на кнопку ниже, чтобы их добавить</span>
        </div>
    )
}

export const HeaderContent : FC<{lessons: Lesson[]}> = ({lessons}) => {
    const platform = useContext(PlatformContext)
    const marks = getMarksFromLessons(lessons)
    return (
    <div className={`header ${platform == 'ios' ? 'rounded-corners' : ''}`}>
        {marks.length == 0 ? <NoMarks/> : <MarksData marks={marks}/>}
        <Modal trigger={<Button style={{marginTop: 'auto'}} stretched size="l">Добавить отметку</Button>}>
            <AddMarkByLesson onSuccess={() => console.log('all ok')} lessons={lessons}/>
        </Modal>
        
    </div>
    )
}
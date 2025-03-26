import { FC, useContext, useState } from "react";

import './IndexPage.css'
import { Button, Modal } from "@telegram-apps/telegram-ui";
import { calculateAverage, getMarksFromLessons } from "@/common/Utils/MarksUtils";
import { AddMarkByLesson } from "../../components/TG/AddMark/AddMark";
import { Lesson } from "@/common/Types/LessonTypes";
import { PlatformContext } from "@/components/App";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";

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

export const HeaderContent : FC<{lessons: Lesson[], onMarkAdd: CallableFunction}> = ({lessons, onMarkAdd}) => {
    const platform = useContext(PlatformContext)
    const marks = getMarksFromLessons(lessons)
    const [modalState, setModalState] = useState(false);

    return (
    <div className={`header ${platform == 'ios' ? 'rounded-corners' : ''}`}>
        {marks.length == 0 ? <NoMarks/> : <MarksData marks={marks}/>}
        <Button onClick={() => setModalState(true)} style={{marginTop: 'auto'}} stretched size="l">Добавить отметку</Button>
        <Modal header={<ModalHeader>Добавление отметки</ModalHeader>} onOpenChange={(is_open) => setModalState(is_open)} open={modalState}>
            <AddMarkByLesson onSuccess={(lesson_id: number, mark: string) => {
                onMarkAdd(lesson_id, mark)
                setModalState(false)
            }} lessons={lessons}/>
        </Modal>
        
    </div>
    )
}
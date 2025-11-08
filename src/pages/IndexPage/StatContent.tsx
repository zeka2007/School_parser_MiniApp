import { Lesson } from "@/common/Types/LessonTypes";
import { getBestLesson, getMarksFromLessons } from "@/common/Utils/MarksUtils";
import { isNumberCheck } from "@/common/Utils/Utils";
import { BookmarksOutlined, FlagOutlined, VerticalAlignBottom, VerticalAlignTop } from "@mui/icons-material";
import { Cell, IconContainer, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";

const StatContent: FC<{ lessons: Lesson[] }> = ({ lessons }) => {
    const best_lesson = getBestLesson(lessons)
    const all_marks = getMarksFromLessons(lessons)

    return (
        <Section >
            <Cell
                className="no-hover"
                before={<IconContainer><BookmarksOutlined fontSize="large" /></IconContainer>}
                subtitle={all_marks.length ? `${best_lesson.lesson} (${best_lesson.average_mark.toFixed(2)})` : '-'}>Лучший предмет</Cell>
            <Cell
                className="no-hover"
                before={<IconContainer><FlagOutlined fontSize="large" /></IconContainer>}
                subtitle={all_marks.length}>Количество отметок</Cell>
            <Cell
                className="no-hover"
                before={<IconContainer><VerticalAlignBottom fontSize="large" /></IconContainer>}
                subtitle={isNumberCheck(Math.min(...all_marks))}>Худшая отметка</Cell>
            <Cell
                className="no-hover"
                before={<IconContainer><VerticalAlignTop fontSize="large" /></IconContainer>}
                subtitle={isNumberCheck(Math.max(...all_marks))}>Лучшая отметка</Cell>
        </Section>
    )
}

export default StatContent
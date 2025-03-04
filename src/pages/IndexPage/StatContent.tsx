import { Lesson } from "@/common/Types/LessonTypes";
import { getBestLesson, getMarksFromLessons } from "@/common/Utils/MarksUtils";
import { BookmarksOutlined, FlagOutlined } from "@mui/icons-material";
import { Cell, IconContainer, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";

const StatContent: FC<{lessons: Lesson[]}> = ({lessons}) => {
    const best_lesson = getBestLesson(lessons)
    const all_marks = getMarksFromLessons(lessons)

    return (
        <Section >
            <Cell
                before={<IconContainer><BookmarksOutlined fontSize="large"/></IconContainer>}
                subtitle={`${best_lesson.lesson} (${best_lesson.average_mark.toFixed(2)})`}>Лучший предмет</Cell>
            <Cell
                before={<IconContainer><FlagOutlined fontSize="large"/></IconContainer>}
                subtitle={all_marks.length}>Количество отметок</Cell>
        </Section>
    )
}

export default StatContent
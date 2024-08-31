import { StudentData } from "@/common/Types/UserTypes";
import { getBestLesson } from "@/common/Utils/MarksUtils";
import { BookmarksOutlined, FlagOutlined, StarOutline } from "@mui/icons-material";
import { Cell, IconContainer } from "@telegram-apps/telegram-ui";
import { FC } from "react";

const StatContent: FC<{data: StudentData}> = ({data}) => {
    const best_lesson = getBestLesson(data.lessons)

    return (
        <div>
            <Cell
                before={<IconContainer><StarOutline fontSize="large"/></IconContainer>}
                subtitle={data?.average_mark}>Средний бал</Cell>
            <Cell
                before={<IconContainer><BookmarksOutlined fontSize="large"/></IconContainer>}
                subtitle={`${best_lesson.lesson} (${best_lesson.average_mark.toFixed(2)})`}>Лучший предмет</Cell>
            <Cell
                before={<IconContainer><FlagOutlined fontSize="large"/></IconContainer>}
                subtitle={data?.marks_count}>Количество отметок</Cell>
        </div>
    )
}

export default StatContent
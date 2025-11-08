import { type FC } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Cell, List, Placeholder, Text } from '@telegram-apps/telegram-ui';
import { calculateAverage, getMarksList } from '@/common/Utils/MarksUtils';
import { Lesson } from '@/common/Types/LessonTypes';
import { isNumberCheck } from '@/common/Utils/Utils';

export const MarkStatsPage: FC = () => {

    const lessons: Lesson[] = useLocation().state
    const navigatePath = useSearchParams()[0].get('navto')
    const title = useSearchParams()[0].get('title')
    const description = useSearchParams()[0].get('description')
    const disabledEmpty = useSearchParams()[0].get('disabledEmpty') == "true" ? true : false
    const navigate = useNavigate()

    return (
        <List>
            {(title || description) && <Placeholder header={title} description={description} />}

            {lessons.map((val,) => <Cell
                className="no-hover"
                disabled={disabledEmpty && val.marks.length == 0}
                key={val.id}
                description={"Отметок: " + getMarksList(val.marks).length}
                onClick={(disabledEmpty && val.marks.length == 0) ? undefined : () => navigate(navigatePath ? navigatePath : '/', { state: val })}
                after={<Text>{isNumberCheck(calculateAverage(getMarksList(val.marks)))}</Text>}>{val.lesson_name}</Cell>
            )}
        </List>
    );
};

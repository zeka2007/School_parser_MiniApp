import { type FC } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Cell, List, Placeholder, Text} from '@telegram-apps/telegram-ui';
import { calculateAverage, getMarksFromLessons, getMarksList } from '@/common/Utils/MarksUtils';
import { Lesson } from '@/common/Types/LessonTypes';

export const MarkStatsPage: FC = () => {

    const lessons: Lesson[] = useLocation().state
    const navigatePath = useSearchParams()[0].get('navto')
    const title = useSearchParams()[0].get('title')
    const description = useSearchParams()[0].get('description')
    const navigate = useNavigate()

    return (
        <List>
            {(title || description) && <Placeholder header={title} description={description}/>}

            { getMarksFromLessons(lessons).length == 0 && <Placeholder header='Отметок нет' description='Попробуйте изменить четверть'/>}

            {lessons.map((val) => <Cell 
                    key={val.lesson_name} 
                    description={"Отметок: " + getMarksList(val.marks).length}
                    onClick={() => navigate(navigatePath ? navigatePath : '/', {state: val})}
                    after={<Text>{calculateAverage(getMarksList(val.marks))}</Text>}>{val.lesson_name}</Cell>
            )}
        </List>
    );
};

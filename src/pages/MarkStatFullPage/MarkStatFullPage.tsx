import { Lesson } from '@/common/Types/LessonTypes';
import { calculateAverage, getMarksList } from '@/common/Utils/MarksUtils';
import { HorizontalScroll } from '@/components/TG/HorizontalScroll/HorizontalScroll';
import { MainPlaceholder } from '@/components/TG/MainPlaceholder/MainPlaceholder';
import { FlagOutlined, StarOutline, VerticalAlignBottom, VerticalAlignTop } from '@mui/icons-material';
import { Cell, IconContainer, LargeTitle, List, Placeholder, Section } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { useLocation } from 'react-router-dom';

export const MarkStatsFullPage: FC = () => {
    const lesson: Lesson = useLocation().state
    const marks_list: number[] = getMarksList(lesson.marks)

    return (
        <List className='list'>

            <MainPlaceholder>
                <Placeholder
                    description='Учебный предмет'
                    header={<LargeTitle caps weight='1'>{lesson.lesson_name}</LargeTitle>} />
            </MainPlaceholder>



            <Section header='Отметки'>
                <div style={{ padding: '8px' }}>
                    <HorizontalScroll mode='mono' list={lesson.marks} />

                </div>
            </Section>

            <Section header='Статистика предмета'>
                <Cell
                    before={<IconContainer><StarOutline fontSize="large" /></IconContainer>}
                    subtitle={calculateAverage(marks_list)}>Средний бал</Cell>
                <Cell
                    before={<IconContainer><VerticalAlignBottom fontSize="large" /></IconContainer>}
                    subtitle={Math.min(...marks_list)}>Худшая отметка</Cell>
                <Cell
                    before={<IconContainer><VerticalAlignTop fontSize="large" /></IconContainer>}
                    subtitle={Math.max(...marks_list)}>Лучшая отметка</Cell>
                <Cell
                    before={<IconContainer><FlagOutlined fontSize="large" /></IconContainer>}
                    subtitle={marks_list.length}>Количество отметок</Cell>

            </Section>

        </List>

    );
};

import { Lesson, StudentData, TransferData } from '@/common/Types';
import { calculateAverage, getMarkString, getMarksList } from '@/common/Utils/MarksUtils';
import { getWeekDay } from '@/common/Utils/Utils'
import { FlagOutlined, StarOutline, VerticalAlignBottom, VerticalAlignTop } from '@mui/icons-material';
import { Accordion, Cell, IconContainer, LargeTitle, List, Placeholder, Section, Selectable, Spinner, Text } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';

export const MarkStatsFullPage: FC = () => {
    const lesson: Lesson = useLocation().state
    const marks_list: number[] = getMarksList(lesson.marks)

    return (
        <List>
            <Placeholder
                style={{margin: '24px 0 0 0'}}
                header={<LargeTitle caps weight='1'>{lesson.lesson_name}</LargeTitle>}/>

            <Section header='Статистика предмета'>
                <Cell
                    before={<IconContainer><StarOutline fontSize="large"/></IconContainer>}
                    subtitle={calculateAverage(lesson.marks)}>Средний бал</Cell>
                <Cell
                    before={<IconContainer><VerticalAlignBottom fontSize="large"/></IconContainer>}
                    subtitle={Math.min(...marks_list)}>Худшая отметка</Cell>
                <Cell
                    before={<IconContainer><VerticalAlignTop fontSize="large"/></IconContainer>}
                    subtitle={Math.max(...marks_list)}>Лучшая отметка</Cell>
                <Cell
                    before={<IconContainer><FlagOutlined fontSize="large"/></IconContainer>}
                    subtitle={marks_list.length}>Количество отметок</Cell>
                
            </Section>
            <Section header='Даты выставления отметок'>
                {lesson.marks.map((mark, index) =>
                    <Cell key={index} description={mark.date} after={<Text>{getMarkString(mark)}</Text> }>{getWeekDay(new Date(mark.date))}</Cell>
                )}
            </Section>
        </List>
    );
};

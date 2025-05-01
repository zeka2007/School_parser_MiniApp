import { useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Cell, Chip, FixedLayout, IconButton, IconContainer, List, Modal, Placeholder, Section } from '@telegram-apps/telegram-ui';
import { calculateAverage, getMarksList } from '@/common/Utils/MarksUtils';
import { AddCircleOutline, CloseRounded, FlagOutlined, StarOutline } from '@mui/icons-material';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { Lesson } from '@/common/Types/LessonTypes';
import { MainPlaceholder } from '@/components/TG/MainPlaceholder/MainPlaceholder';
import { hapticFeedbackImpactOccurred } from '@telegram-apps/sdk-react';

export const MarkAddCheckPage: FC = () => {

    const lesson: Lesson = useLocation().state;
    const marks_list = getMarksList(lesson.marks)
    const [modalState, setModalState] = useState(false)

    const [marks, setMarks] = useState<number[]>([]);

    return (
        <List className='list-padding'>
            <MainPlaceholder>
                <Placeholder
                    header='Калькулятор отметок'
                    description='Для добавления отметки нажмите на кнопку ниже, для удаления нажмите на крестик' />
            </MainPlaceholder>
            {marks_list.length + marks.length > 0 &&
                <Section header={'Статистика'}>
                    <Cell
                        className="no-hover"
                        before={<IconContainer><StarOutline fontSize="large" /></IconContainer>}
                        subtitle={calculateAverage(marks.concat(marks_list))}>Средний бал</Cell>
                    <Cell
                        className="no-hover"
                        before={<IconContainer><FlagOutlined fontSize="large" /></IconContainer>}
                        subtitle={marks_list.length + marks.length}>Количество отметок</Cell>
                    <Cell
                        className="no-hover"
                        before={<IconContainer><AddCircleOutline fontSize='large' /></IconContainer>}
                        subtitle={marks.length}>Добавлено отметок</Cell>
                </Section>}

            {marks.length != 0 && <Section header='Добавленные отметки'>
                {marks?.map((mark, i) => <Cell
                    className="no-hover"
                    key={i}
                    after={
                        <IconButton
                            onClick={() => setMarks(marks.filter((_, m_index) => m_index !== i))}
                            size='s'
                            mode='plain'>
                            <CloseRounded />
                        </IconButton>
                    }>{'Отметка: ' + mark}</Cell>)}

            </Section>}
            {marks_list.length + marks.length == 0 && <MainPlaceholder><Placeholder header='Отметок нет' /></MainPlaceholder>}

            <Modal
                header={<ModalHeader>Добавление отметки</ModalHeader>}
                onOpenChange={(is_open) => {
                    setModalState(is_open)
                }}
                open={modalState}>
                <div style={{ padding: 16, textAlign: 'center' }}>
                    {[...Array(10)].map((_, i) => <Chip
                        onClick={() => {
                            hapticFeedbackImpactOccurred('light')
                            setMarks([...marks, i + 1]);
                            setModalState(false)
                        }} style={{ margin: 8 }
                        }
                        key={i}>{i + 1}</Chip>)}
                </div>
            </Modal>

            <FixedLayout style={{ padding: 16 }}>
                <Button
                    size="l"
                    stretched
                    onClick={() => {
                        hapticFeedbackImpactOccurred('heavy')
                        setModalState(true)
                    }}>Добавить отметку</Button>
            </FixedLayout>
        </List>
    );
};

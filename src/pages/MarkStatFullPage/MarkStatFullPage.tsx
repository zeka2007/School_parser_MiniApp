import { Lesson } from '@/common/Types/LessonTypes';
import { addMark, calculateAverage, deleteMark, editMark, getMarksList } from '@/common/Utils/MarksUtils';
import { HorizontalScroll } from '@/components/TG/HorizontalScroll/HorizontalScroll';
import { MainPlaceholder } from '@/components/TG/MainPlaceholder/MainPlaceholder';
import { FlagOutlined, StarOutline, VerticalAlignBottom, VerticalAlignTop } from '@mui/icons-material';
import { Button, Cell, IconContainer, LargeTitle, List, Modal, Placeholder, Section, Title } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { AddMarkBase } from '../../components/TG/AddMark/AddMark';

export const MarkStatsFullPage: FC = () => {
    const lesson: Lesson = useLocation().state
    const marks_list: number[] = getMarksList(lesson.marks)
    const [modalState, setModalState] = useState(false)
    const [currentMark, setCurrentMark] = useState<string>()
    const [currentMarkIndex, setCurrentMarkIndex] = useState<number>(0)

    return (
        <List className='list'>

            <MainPlaceholder>
                <div style={{ padding: '16px' }}>
                    <Placeholder
                        description='Учебный предмет'
                        header={<LargeTitle caps weight='1'>{lesson.lesson_name}</LargeTitle>} />
                    <Button onClick={() => {
                        setCurrentMark(undefined)
                        setModalState(true)
                    }} size='l' stretched>Добавить отметку</Button>
                </div>
            </MainPlaceholder>

            {lesson.marks.length == 0 && <MainPlaceholder>
                <Placeholder header={<Title>Отметок нет</Title>} />
            </MainPlaceholder>}

            {lesson.marks.length > 0 && (<><Section header='Отметки'>
                <div style={{ padding: '8px' }}>
                    <HorizontalScroll onItemClick={(mark_index: number) => {
                        setCurrentMark(lesson.marks[mark_index])
                        setCurrentMarkIndex(mark_index)
                        setModalState(true)
                    }} mode='mono' list={lesson.marks} />
                </div>
            </Section><Section header='Статистика предмета'>
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

                </Section></>
            )
            }

            <Modal
                header={<ModalHeader>{currentMark ? 'Изменить/удалить отметку' : 'Добавление отметки'}</ModalHeader>}
                onOpenChange={(is_open) => {
                    setModalState(is_open)
                    if (!is_open) setCurrentMark(undefined)
                }}
                open={modalState}
            >
                <AddMarkBase
                    currentMark={currentMark}
                    onDelete={() => {
                        deleteMark(lesson.id, currentMarkIndex)
                        setModalState(false)
                        lesson.marks = lesson.marks.filter((_, index) => index != currentMarkIndex)
                        history.replaceState(lesson, "lesson data")
                    }}
                    onSubmit={(newMark: string) => {
                        if (currentMark) {
                            editMark(lesson.id, currentMarkIndex, newMark)
                            lesson.marks[currentMarkIndex] = newMark
                            setModalState(false)
                            history.replaceState(lesson, "lesson data")
                        }
                        else {
                            addMark(lesson.id, newMark)
                            lesson.marks.push(newMark)
                            setModalState(false)
                            history.replaceState(lesson, "lesson data")
                        }
                    }}
                />

            </Modal>

        </List>

    );
};

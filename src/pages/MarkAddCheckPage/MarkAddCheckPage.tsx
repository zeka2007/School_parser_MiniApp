import { useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Lesson } from '@/common/Types';
import { Button, Cell, Chip, FixedLayout, IconContainer, List, Modal, Placeholder, Section, Text} from '@telegram-apps/telegram-ui';
import { usePopup } from '@tma.js/sdk-react';
import { calculateSumAndCount, showDeleteTemporaryMarkDialog } from '@/common/Utils/MarksUtils';
import { AddCircleOutline, FlagOutlined, StarOutline } from '@mui/icons-material';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';

export const MarkAddCheckPage: FC = () => {

    const state: Lesson = useLocation().state;
    const popup = usePopup();
    const [modalState, setModalState] = useState(false)

    const [marks, setMarks] = useState<number[]>([]);

    const [stat, setStat] = useState(calculateSumAndCount(state.marks))
   
    return (
        <List style={{marginBottom: 82}}>            
            {state.marks.length > 0 &&
            <Section header={'Статистика'}>
                <Cell
                    before={<IconContainer><StarOutline fontSize="large"/></IconContainer>}
                    subtitle={(stat.sum / stat.length).toFixed(2)}>Средний бал</Cell>
                    <Cell
                        before={<IconContainer><FlagOutlined fontSize="large"/></IconContainer>}
                        subtitle={stat.length}>Количество отметок</Cell>
                    <Cell
                        before={<IconContainer><AddCircleOutline fontSize='large'/></IconContainer>}
                        subtitle={marks?.length}>Добавлено отметок</Cell>
            </Section>}

            { marks.length != 0 && <Section header='Добавленные отметки'>
                { marks?.map((mark, i) => <Cell 
                    key={i}
                    onClick={() => showDeleteTemporaryMarkDialog(popup, () => {
                            let newMarks = marks;
                            newMarks.splice(i, 1)
                            setStat({sum: stat.sum - mark, length: stat.length - 1})
                            setMarks(newMarks);
                        }
                    )} 
                    after={<Text>{mark}</Text>}>Отметка</Cell>)}

            </Section>}
            { marks.length == 0 && <Placeholder header='Отметок нет' description='Для добавления отметки нажмите на кнопку ниже'/>}

            <Modal
                header={<ModalHeader>Добавление отметки</ModalHeader>}
                onOpenChange={(is_open) => {
                    setModalState(is_open)
                }}
                open={modalState}>
                <div style={{padding: 16, textAlign: 'center'}}>
                    { [...Array(10)].map((_, i) => <Chip 
                        onClick={ () => {
                            setMarks([...marks, i + 1]); 
                            setStat({sum: stat.sum + i + 1, length: stat.length + 1})
                            setModalState(false)}} style={{margin: 8}
                        } 
                        key={i}>{i + 1}</Chip>)}
                    </div>
            </Modal>

            <FixedLayout style={{padding: 16}}>
                <Button 
                    size="l" 
                    stretched 
                    onClick={() => setModalState(true)}>Добавить отметку
                </Button>
            </FixedLayout>

            {/* {query.data?.lessons.map((val) => <Cell 
                    key={val.lesson_name} 
                    description={"Отметок: " + val.marks.length}
                    onClick={() => navigate('mark-stat-full', {state: val})}
                    after={<Text>{calculateAverage(val.marks)}</Text>}>{val.lesson_name}</Cell>
            )} */}
        </List>
    );
};

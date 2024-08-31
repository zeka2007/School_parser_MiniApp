import { useMemo, useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Cell, Text, List, Placeholder, Section, Select} from '@telegram-apps/telegram-ui';
import { calculateSumAndCount } from '@/common/Utils/MarksUtils';
import { FixMark } from '@/common/Types/MarkTypes';
import { Lesson } from '@/common/Types/LessonTypes';


export const FixesPage: FC = () => {

    const lesson: Lesson = useLocation().state;
    const stat = calculateSumAndCount(lesson.marks)
    const roundedMark = Math.round(stat.sum / stat.length)
    const [aimMark, setAimMark] = useState(roundedMark < 10 ? roundedMark + 1 : 10)

    const result = useMemo(() => {
        let fixedList: FixMark[] = [];
        let count = 0

        let startMark = aimMark;
        let length = stat.length;
        let sum = stat.sum;
        if (startMark <= roundedMark) return fixedList
        while (true) {
            sum += startMark
            length++
            count++
            if (Math.round(sum / length) == aimMark) {
                fixedList.push({mark: startMark, count: count})
                if (startMark == 10) break
                count = 0;
                startMark++;
                length = stat.length;
                sum = stat.sum;
            }
        }
        return fixedList
    }, [aimMark])

    if (roundedMark == 10) return <div className='center'><Placeholder header='Вы не можете улучшить отметку'></Placeholder></div>

    return (
        <List>
            <Select value={aimMark} onChange={(e) => setAimMark(Number(e.target.value))} header='Желаемая отметка'>
                {[...Array(10 - roundedMark)].map((_, i) => <option key={i} value={roundedMark + i + 1}>{roundedMark + i + 1}</option>)}
            </Select>
            <Section header='Инструкции для достижения цели'>
                {result.map((item, i) => <Cell key={i} after={<Text>{'Количество: ' + item.count}</Text>}>{item.mark.toString()}</Cell>)}
            </Section>
        </List>
    );
};

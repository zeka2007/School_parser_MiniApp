import { useMemo, useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Cell, Text, List, Placeholder, Section, Chip } from '@telegram-apps/telegram-ui';
import { calculateSum, getMarksList, getSessionMarksData } from '@/common/Utils/MarksUtils';
import { FixMark } from '@/common/Types/MarkTypes';
import { Lesson } from '@/common/Types/LessonTypes';
import { MainPlaceholder } from '@/components/TG/MainPlaceholder/MainPlaceholder';
import { CustomHorizontalScroll } from '@/components/TG/HorizontalScroll/HorizontalScroll';
import { BannerChip } from '@/components/TG/BannerChip/BannerChip';


export const FixesPage: FC = () => {

    const lesson: Lesson = useLocation().state;
    const marks = getMarksList(lesson.marks)
    const marksSum = calculateSum(marks)
    const roundedMark = Math.round(marksSum / marks.length)
    const { max_mark } = getSessionMarksData()
    const [aimMark, setAimMark] = useState(roundedMark < max_mark ? roundedMark + 1 : max_mark)
    const marksList = [...Array(max_mark - roundedMark)].map((_, i) => roundedMark + i + 1)

    const result = useMemo(() => {

        let fixedList: FixMark[] = [];
        let count = 0

        let startMark = aimMark;
        let length = marks.length;
        let sum = marksSum;
        if (startMark <= roundedMark) return fixedList
        while (true) {

            sum += startMark
            length++
            count++
            if (Math.round(sum / length) >= aimMark) {
                fixedList.push({ mark: startMark, count: count })
                if (startMark == max_mark) break
                count = 0;
                startMark++;
                length = marks.length;
                sum = marksSum;
            }
        }
        return fixedList
    }, [aimMark])

    return (
        <List className='list'>
            <MainPlaceholder>
                <Placeholder
                    header='Улучшение отметки'
                    description='Выберите цель, после чего сможете увидеть отметки, которые необходимо получить для ее достижения' />
            </MainPlaceholder>


            <Section header='Желаемая отметка'>
                <div style={{ padding: '8px' }}>
                    {roundedMark == max_mark ? <BannerChip mode='mono'>Вы не можете улучшить отметку</BannerChip> :
                        <CustomHorizontalScroll>

                            {marksList.map((m) => <Chip
                                mode='mono'
                                onClick={() => setAimMark(m)}
                                className={`scroll-cell ${m == aimMark ? 'cell-border' : ''}`}>{m}</Chip>)}

                        </CustomHorizontalScroll>
                    }
                </div>
            </Section>

            <Section header='Инструкции для достижения цели'>
                {roundedMark == max_mark ?
                    <div style={{ padding: '8px' }}>
                        <BannerChip mode='mono'>Нет доступных инструкций</BannerChip>
                    </div> :
                    result.map((item, i) => <Cell className="no-hover" key={i} after={<Text>{'Количество: ' + item.count}</Text>}>{item.mark.toString()}</Cell>)
                }
            </Section>
        </List>
    );
};

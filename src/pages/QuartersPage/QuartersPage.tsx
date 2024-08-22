
import {useMemo, useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { StudentData } from '@/common/Types';
import { Cell, List, Placeholder, Text} from '@telegram-apps/telegram-ui';
import { useQuery } from 'react-query';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { convertType, getQuarterData } from '@/common/Utils/DiaryUtils';
import { QuaretrChoose } from '../MarkStatsPage/QuarterChoose';

import './style.css'
import { QuarterCompare } from '@/common/Types/QuarterTypes';

export const QuartersPage: FC = () => {

    const state: StudentData = useLocation().state
    const { initDataRaw } = retrieveLaunchParams();
    const [firstQuarter, setFirstQuarter] = useState(state.user.quarter)
    const [secondQuarter, setSecondQuarter] = useState(state.user.quarter)

    const firstQuarteQuery = useQuery(['first-quarter', firstQuarter], () => {
        let params = new URLSearchParams();
        
        params.append('type', convertType(state.user.type).toString())
        params.append('diary_id', state.user.diary_id.toString())
        params.append('quarter', firstQuarter.toString())
        return getQuarterData(initDataRaw, params)
    })

    const secondQuarteQuery = useQuery(['first-quarter', secondQuarter], () => {
        let params = new URLSearchParams();
        
        params.append('type', convertType(state.user.type).toString())
        params.append('diary_id', state.user.diary_id.toString())
        params.append('quarter', secondQuarter.toString())
        return getQuarterData(initDataRaw, params)
    })

    const all_marks: QuarterCompare[] = useMemo(() => {
        var result: QuarterCompare[] = []
        const firstList = firstQuarteQuery.data ? firstQuarteQuery.data : []
        const secondList = secondQuarteQuery.data ? secondQuarteQuery.data : []

        firstList.map((item, i) => {
            if (item.lesson_name == secondList[i]?.lesson_name) {
                const firstMark = Number(item.mark)
                const secondMark = Number(secondList[i].mark)
                if (firstMark && secondMark) {
                    var percent;
                    var symbol: '+' | '-'
                    if (firstMark > secondMark) {
                        percent = ((firstMark - secondMark) / firstMark) * 100
                        symbol = '-'
                    }
                    else {
                        percent = ((secondMark - firstMark) / firstMark) * 100
                        symbol = '+'
                    }

                    result.push(
                        {
                            lesson_name: item.lesson_name, 
                            first_mark: firstMark, 
                            second_mark: secondMark,
                            result_symbol: symbol,
                            result: percent
                        }
                    )
                }
                else result.push({lesson_name: item.lesson_name, first_mark: item.mark, second_mark: secondList[i].mark})
            }
        })

        return result
    }, [firstQuarteQuery.data, secondQuarteQuery.data])
   
    return (
        <List>
            <Placeholder header='Сравнение четвертей' description='Выберите четврти слева и справа для сравнения'/>

            <div className='box'>
                <div><QuaretrChoose state={state} query={firstQuarteQuery} callback={(quarter: number) =>{ setFirstQuarter(quarter)}}/></div>
                <div><QuaretrChoose state={state} query={secondQuarteQuery} callback={(quarter: number) =>{ setSecondQuarter(quarter)}}/></div>
            </div>

            {all_marks?.map((val, i) => <Cell 
                    key={i} 
                    after={<Text>{`${val.first_mark}/${val.second_mark} ${val.result_symbol ? `(${val.result_symbol}${val.result?.toFixed(1)}%)` : ``}`}</Text>}>{val.lesson_name}</Cell>
            )}
        </List>
    );
};

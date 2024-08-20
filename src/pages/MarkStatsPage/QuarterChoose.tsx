import { Mark, StudentData } from '@/common/Types';
import { Accordion, Cell, LargeTitle, List, Placeholder, Section, Selectable, Spinner, Text } from '@telegram-apps/telegram-ui';
import { AccordionContent } from '@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent';
import { AccordionSummary } from '@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary';
import { useState, type FC } from 'react';
import { UseQueryResult } from 'react-query';

export const QuaretrChoose: FC<{state: StudentData, query: UseQueryResult, callback?: CallableFunction}> = ({state, query, callback = () => {}}) => {
    const [expanded, setExpanded] = useState(false)
    const [selectQuarter, setSelectQuarter] = useState(state.user.quarter - 1)
    
    return (
        <Accordion 
            onChange={(state: boolean) => {if (!query.isLoading) setExpanded(state) }} 
            expanded={expanded}>
            <AccordionSummary
                disabled={query.isLoading}
                after={query.isLoading && <Spinner size='s'/>}
                style={{
                    background: 'var(--tgui--bg_color)',
                    margin: 0
                }}>Четверть: {selectQuarter + 1}</AccordionSummary>
            <AccordionContent >
                {[...Array(4)].map((_, i) => 
                    <Cell
                        key={i}
                        after={i == selectQuarter ? <Selectable defaultChecked/> : ''}
                        onClick={() => {
                            if (i != selectQuarter) callback(i + 1); setSelectQuarter(i)
                            setExpanded(false)
                        }}>{i+1} четверть</Cell>)}
            </AccordionContent>
        </Accordion>

    );
};

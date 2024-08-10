import { StudentData } from "@/common/Types";
import { Cell, Navigation, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const UtilsComponent: FC<{data: StudentData | undefined}> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Section header={'Инструменты'}>
            <Cell 
                after={<Navigation/>} 
                onClick={() => { navigate('mark-stat', {state: data}) }}>Анализ отметок</Cell>
            <Cell after={<Navigation/>}>Способы исправления</Cell>
            <Cell after={<Navigation/>}>Анализ четвертей</Cell>
            <Cell after={<Navigation/>}>Калькулятор отметок</Cell>
            <Cell after={<Navigation/>}>Экспорт данных</Cell>
            
        </Section>
    )
}

export default UtilsComponent
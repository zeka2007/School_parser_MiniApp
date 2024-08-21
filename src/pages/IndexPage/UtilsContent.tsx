import { StudentData } from "@/common/Types";
import { Cell, Navigation, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const UtilsComponent: FC<{data: StudentData | undefined}> = ({data}) => {

    const navigate = useNavigate()

    const navToStatPage = (lessonPath: string) => navigate('/mark-stat?navto=' + lessonPath, {state: data})

    return (
        <Section header={'Инструменты'}>
            <Cell 
                after={<Navigation/>} 
                onClick={() => navToStatPage('mark-stat-full')}>Анализ отметок</Cell>
            <Cell onClick={() => navToStatPage('fixes')} after={<Navigation/>} >Способы исправления</Cell>
            <Cell after={<Navigation/>}>Анализ четвертей</Cell>
            <Cell onClick={() => navToStatPage('mark-add-check')} after={<Navigation/>}>Калькулятор отметок</Cell>
            <Cell after={<Navigation/>}>Экспорт данных</Cell>
            
        </Section>
    )
}

export default UtilsComponent
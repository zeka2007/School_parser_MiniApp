import { StudentData } from "@/common/Types";
import { Cell, Navigation, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const UtilsComponent: FC<{data: StudentData | undefined}> = ({data}) => {

    const navigate = useNavigate()


    const navToStatPage = (lessonPath: string, title?: string, description?: string) => {
        var params = new URLSearchParams()
        params.append('navto', lessonPath)
        if (title) params.append('title', title)
        if (description) params.append('description', description)
        navigate('/mark-stat?' + params.toString(), {state: data})
    }

    return (
        <Section header={'Инструменты'}>
            <Cell 
                after={<Navigation/>} 
                onClick={() => navToStatPage('mark-stat-full', 'Анализ отметок', 'Для получения подробной информации нажмите на предмет')}>Анализ отметок</Cell>
            <Cell onClick={() => navToStatPage('fixes', 'Способы исправления', 'Для получения советов по исправлению отметки нажмите на предмет')} after={<Navigation/>} >Способы исправления</Cell>
            <Cell onClick={() => navigate('/quarters', {state: data})} after={<Navigation/>}>Анализ четвертей</Cell>
            <Cell onClick={() => navToStatPage('mark-add-check', 'Калкулятор отметок', 'Для ввода отметок нажмите на предмет')} after={<Navigation/>}>Калькулятор отметок</Cell>
            <Cell onClick={() => navigate('/report', {state: data})} after={<Navigation/>}>Экспорт данных</Cell>
            
        </Section>
    )
}

export default UtilsComponent
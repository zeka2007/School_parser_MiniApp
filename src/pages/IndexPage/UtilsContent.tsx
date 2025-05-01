import { Lesson } from "@/common/Types/LessonTypes";
import { Cell, Navigation, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const UtilsComponent: FC<{ lessons: Lesson[] }> = ({ lessons }) => {

    const navigate = useNavigate()

    const navToStatPage = (lessonPath: string, title?: string, description?: string, disabledEmpty?: boolean) => {
        var params = new URLSearchParams()
        params.append('navto', lessonPath)
        if (title) params.append('title', title)
        if (description) params.append('description', description)
        if (disabledEmpty) params.append('disabledEmpty', disabledEmpty.toString())
        navigate('/mark-stat?' + params.toString(), { state: lessons })
    }

    return (
        <Section header={'Инструменты'}>
            <Cell
                className="no-hover"
                after={<Navigation />}
                onClick={() => navToStatPage('mark-stat-full', 'Анализ отметок', 'Для получения подробной информации нажмите на предмет')}>Анализ отметок</Cell>
            <Cell
                className="no-hover"
                onClick={() => navToStatPage('fixes', 'Способы исправления', 'Для получения советов по исправлению отметки нажмите на предмет', true)}
                after={<Navigation />} >Способы исправления</Cell>
            <Cell
                className="no-hover"
                onClick={() => navToStatPage('mark-add-check', 'Калкулятор отметок', 'Для ввода отметок нажмите на предмет', true)}
                after={<Navigation />}>Калькулятор отметок</Cell>

        </Section>
    )
}

export default UtilsComponent
import { Lesson } from "@/common/Types/LessonTypes";
import { Cell, Navigation, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const ActionsComponent: FC<{ lessons: Lesson[] }> = ({ lessons }) => {

    const navigate = useNavigate()

    return (
        <Section header={'Действия'}>
            <Cell onClick={() => navigate('/lessons', { state: lessons })} after={<Navigation />}>Управление предметами</Cell>
        </Section>
    )
}

export default ActionsComponent
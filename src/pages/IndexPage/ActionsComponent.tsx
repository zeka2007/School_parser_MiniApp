import { showDeleteAllDataDialog } from "@/common/Dialogs/UserDialogs";
import { Lesson } from "@/common/Types/LessonTypes";
import { deleteAll } from "@/common/Utils/UserUtils";
import { hapticFeedbackNotificationOccurred } from "@telegram-apps/sdk-react";
import { ButtonCell, Cell, Navigation, Section } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const ActionsComponent: FC<{ lessons: Lesson[] }> = ({ lessons }) => {

    const navigate = useNavigate()

    return (
        <Section header={'Действия'}>
            <Cell
                className="no-hover"
                onClick={() => navigate('/lessons', { state: lessons })}
                after={<Navigation />}>Управление предметами</Cell>
            <ButtonCell onClick={() => showDeleteAllDataDialog(() => {
                deleteAll().then(() => {
                    hapticFeedbackNotificationOccurred('success')
                    navigate('/welcome', { replace: true })
                })
            })} mode='destructive'>Удалить все данные</ButtonCell>
        </Section>
    )
}

export default ActionsComponent
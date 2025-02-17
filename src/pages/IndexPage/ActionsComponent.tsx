import { Lesson } from "@/common/Types/LessonTypes";
import { Cell, Navigation, Section } from "@telegram-apps/telegram-ui";
import { retrieveLaunchParams, usePopup } from "@tma.js/sdk-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const ActionsComponent: FC<{lessons: Lesson[]}> = ({lessons}) => {

    const { initDataRaw } = retrieveLaunchParams();
    const popup = usePopup()

    const navigate = useNavigate()



    return (
        <Section header={'Действия'}>
            
            <Cell onClick={() => navigate('/lessons', {state: lessons})} after={<Navigation/>}>Управление предметами</Cell>

            
            {/* {(data?.user.is_login_date_saved && showDeleteLoginDataBtn) && <ButtonCell onClick={() => deleteDiaryLoginDataDialog(popup, deleteLoginDataMutation, data.user.diary_id)} mode='destructive'>Удалить логин и пароль</ButtonCell>}
            <ButtonCell 
                mode='destructive'
                onClick={
                    () => {
                        if (data) deleteDiaryDialog(popup, deleteMutation, {
                            type: data.user.type,
                            id: data.user.diary_id
                        })}
                }>Удалить дневник</ButtonCell> */}

            
        </Section>
    )
}

export default ActionsComponent
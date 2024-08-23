import { StudentData } from "@/common/Types";
import { DeleteDiary } from "@/common/Types/DiaryTypes";
import { deleteDiary, deleteDiaryDialog, deleteDiaryLoginData, deleteDiaryLoginDataDialog, updateDiary } from "@/common/Utils/DiaryUtils";
import { ButtonCell, Cell, Navigation, Section, Switch } from "@telegram-apps/telegram-ui";
import { retrieveLaunchParams, usePopup } from "@tma.js/sdk-react";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


const ActionsComponent: FC<{data: StudentData | undefined}> = ({data}) => {

    const { initDataRaw } = retrieveLaunchParams();
    const popup = usePopup()

    const navigate = useNavigate()

    const [checked, setChecked] = useState(data?.user.main_now)
    const [showDeleteLoginDataBtn, setShowDeleteLoginDataBtn] = useState(true)

    const updateMutation = useMutation((diaryData: any) => updateDiary(diaryData, initDataRaw))
    const deleteMutation = useMutation(
        (diaryData: DeleteDiary) => deleteDiary(diaryData, initDataRaw),
        {
            onSuccess: () => navigate('/diaries', {replace: true})
        }
    )

    const deleteLoginDataMutation = useMutation(
        (diary_id: number) => deleteDiaryLoginData(diary_id, initDataRaw),
        {
            onSuccess: () => setShowDeleteLoginDataBtn(false)
        }
    )

    return (
        <Section header={'Действия'}>
            <Cell 
                Component='label'
                after={
                    <Switch 
                        checked={checked}
                        disabled={checked}
                        onChange={
                            (e) => {
                                updateMutation.mutate(
                                    {
                                        type: data?.user.type,
                                        id: data?.user.diary_id,
                                        is_main: e.target.checked
                                    }
                                )
                                setChecked(e.target.checked)
                            }
                        }/>
                }>Основной дневник</Cell>
            {/* <Cell after={<Navigation/>}>Создать копию дневника</Cell> */}
            {data?.user.type == 'Виртуальный дневник' && <Cell onClick={() => navigate('/lessons', {state: data})} after={<Navigation/>}>Управление предметами</Cell>}

            
            {(data?.user.is_login_date_saved && showDeleteLoginDataBtn) && <ButtonCell onClick={() => deleteDiaryLoginDataDialog(popup, deleteLoginDataMutation, data.user.diary_id)} mode='destructive'>Удалить логин и пароль</ButtonCell>}
            <ButtonCell 
                mode='destructive'
                onClick={
                    () => {
                        if (data) deleteDiaryDialog(popup, deleteMutation, {
                            type: data.user.type,
                            id: data.user.diary_id
                        })}
                }>Удалить дневник</ButtonCell>

            
        </Section>
    )
}

export default ActionsComponent
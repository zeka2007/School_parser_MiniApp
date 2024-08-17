import { StudentData } from "@/common/Types";
import { deleteDiary, deleteDiaryDialog, updateDiary } from "@/common/Utils/DiaryUtils";
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

    const updateMutation = useMutation((diaryData: any) => updateDiary(diaryData, initDataRaw))
    const deleteMutation = useMutation(
        (diaryData: any) => deleteDiary(diaryData, initDataRaw),
        {
            onSuccess: () => navigate('/diaries', {replace: true})
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
            <Cell after={<Navigation/>}>Создать копию дневника</Cell>

            
            {data?.user.type == 'SCHOOLS.BY' && <ButtonCell mode='destructive'>Удалить логин и пароль</ButtonCell>}
            <ButtonCell 
                mode='destructive'
                onClick={
                    () => {
                        if (data) deleteDiaryDialog(popup, deleteMutation, {
                            type: data.user.type,
                            name: data.user.description,
                            id: data.user.diary_id
                        })}
                }>Удалить дневник</ButtonCell>
        </Section>
    )
}

export default ActionsComponent
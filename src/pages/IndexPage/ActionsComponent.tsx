import { StudentData } from "@/common/Types";
import { DeleteSweep } from "@mui/icons-material";
import { ButtonCell, Cell, IconContainer, Navigation, Section, Switch } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


const ActionsComponent: FC<{data: StudentData | undefined}> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Section header={'Действия'}>
            <Cell Component='label' after={<Switch/>}>Основной дневник</Cell>
            <Cell after={<Navigation/>}>Создать копию дневника</Cell>
            <ButtonCell mode='destructive'>Удалить логин и пароль</ButtonCell>
            <ButtonCell mode='destructive'>Удалить дневник</ButtonCell>
        </Section>
    )
}

export default ActionsComponent
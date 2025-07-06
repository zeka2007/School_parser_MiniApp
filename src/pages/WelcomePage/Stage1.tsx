import { Button, FixedLayout, Placeholder } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import './WelcomePage.css'

export const Stage1: FC = () => {

    const navigator = useNavigate()

    return <div className="parent">
        <Placeholder
            header='Добро пожаловать в виртуальный дневник!'
            description='Здесь вы можете вручную вносить информацию о вашей успеваемости, а система посчитает средний балл и подскажет способ исправить отметку' />
        <FixedLayout className="bottom-layout">
            <Button
                size="l"
                stretched
                onClick={() => navigator('/welcome/stage2', {replace: true})}>Вперед!</Button>
        </FixedLayout>
    </div>

}
import { FC } from "react";

import './IndexPage.css'
import { Button } from "@telegram-apps/telegram-ui";
import { useLaunchParams } from "@tma.js/sdk-react";
import { calculateAverage } from "@/common/Utils/MarksUtils";

export const HeaderContent : FC<{marks: number[]}> = ({marks}) => {
    const lp = useLaunchParams()
    return (
    <div className={`header ${['macos', 'ios'].includes(lp.platform) ? 'rounded-corners' : ''}`}>
        <div className="header-text">
            <span className="mark-text">{calculateAverage(marks)}</span>
            <br/>
            <span className="subtitle">Средний балл</span>
        </div>
        <Button style={{marginTop: 'auto'}}stretched size="l">Добавить отметку</Button>
    </div>
    )
}
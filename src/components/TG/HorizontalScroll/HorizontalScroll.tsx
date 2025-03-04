import { Chip } from "@telegram-apps/telegram-ui"
import { FC } from "react"
import './HorizontalScroll.css'

export const HorizontalScroll: FC<{list: any[], mode?: "elevated" | "mono" | "outline"}> = ({list, mode}) => {
    return (
        <div className='h-scroll'>
            {list.map((item, index) =>
                <Chip mode={mode} className="scroll-cell" key={index}>{item}</Chip>
            )}
        </div>
    )
}
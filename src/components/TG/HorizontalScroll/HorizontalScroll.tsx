import { Chip } from "@telegram-apps/telegram-ui"
import { FC } from "react"
import './HorizontalScroll.css'

export const HorizontalScroll: FC<{list: any[], mode?: "elevated" | "mono" | "outline", onItemClick?: CallableFunction}> = ({list, mode, onItemClick = () => {}}) => {
    return (
        <div className='h-scroll'>
            {list.map((item, index) =>
                <Chip onClick={() => onItemClick(index)} mode={mode} className="scroll-cell" key={index}>{item}</Chip>
            )}
        </div>
    )
}
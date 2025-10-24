import { Chip } from "@telegram-apps/telegram-ui"
import { FC, ReactNode } from "react"
import './HorizontalScroll.css'

export const HorizontalScroll: FC<{list: any[], mode?: "elevated" | "mono" | "outline", onItemClick?: CallableFunction}> = ({list, mode, onItemClick = () => {}}) => {
    return (
        <CustomHorizontalScroll>
            {list.map((item, index) =>
                <Chip onClick={() => onItemClick(index)} mode={mode} className="scroll-cell" key={index}>{item}</Chip>
            )}
        </CustomHorizontalScroll>
    )
}

export const CustomHorizontalScroll: FC<{children?: ReactNode}> = ({children}) => {
    return (
        <div className='h-scroll'>
            {children}
        </div>
    )
}
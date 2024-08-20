import { FC, ReactNode } from "react";
import './MarkChip.css'

const MarkChipSlash: FC<{onClick?: CallableFunction, chooseFirst: boolean, first: ReactNode, second: ReactNode}> = ({onClick = () => {}, chooseFirst = true, first, second}) => (
    <div>
        <div onClick={() => onClick(0)} className={chooseFirst ? 'chip chip-selected' : 'chip'}>
            <span>{first}</span>
        </div>
        <span className="slash">/</span>
        <div onClick={() => onClick(1)} className={!chooseFirst ? 'chip chip-selected' : 'chip'}>
            <span>{second}</span>
        </div>
    </div>
);

export default MarkChipSlash
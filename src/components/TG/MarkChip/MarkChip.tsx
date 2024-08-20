import { FC, ReactNode } from "react";
import './MarkChip.css'

const MarkChip: FC<{children?: ReactNode}> = ({children}) => (
    <div className="chip">
        <span>{children}</span>
    </div>
);

export default MarkChip
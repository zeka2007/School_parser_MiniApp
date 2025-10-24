import { Chip } from "@telegram-apps/telegram-ui";
import { FC, ReactNode } from "react";
import './BannerChip.css'

export const BannerChip: FC<{children?: ReactNode, mode?: "elevated" | "mono" | "outline"}> = ({children, mode}) => {
    return <div className="banner-chip-div"><Chip mode={mode} className="banner-chip">{children}</Chip></div>
}
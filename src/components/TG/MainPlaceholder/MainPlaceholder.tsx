import { FC, ReactElement, useContext } from 'react'
import './MainPlaceholder.css'
import { PlatformContext } from '@/components/App'

export const MainPlaceholder: FC<{children: ReactElement}> = ({children}) => {
    const platform = useContext(PlatformContext)
    return (
        <div className={`data-placeholder ${platform == 'ios' ? 'data-placeholder-ios' : ''}`}>{children}</div>
    )
}
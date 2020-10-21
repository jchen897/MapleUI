import React, { FC } from 'react'

export interface TabItemProps {
  /** Label in Tab */
  label: string | React.ReactElement;
  /** Disable Tab or not */
  disabled?: boolean;
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return (
    <div className="viking-tab-panel">
      {children}
    </div>
  )
}

export default TabItem;
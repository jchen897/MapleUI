import React, { FC } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  /** Display different colors and themes */
  theme? : ThemeProps
}

/**
 * Provide a set of icons from react-fontawesome。
 * 
 * Support react-fontawesome properties. Properties introducion: https://github.com/FortAwesome/react-fontawesome#basic
 * 
 * Support all fontawesome free-solid-icons，All icons: https://fontawesome.com/icons?d=gallery&s=solid&m=free
 * ### How to import
 * 
 * ~~~js
 * import { Icon } from 'vikingship'
 * ~~~
 */
export const Icon: FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props
  const classes = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon;
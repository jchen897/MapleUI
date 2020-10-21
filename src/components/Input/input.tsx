import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' > {
  /**Disable Input */
  disabled?: boolean;
  /**Set input size，can be lg or sm */
  size?: InputSize;
  /**Add icons */
  icon?: IconProp;
  /**Add prefix */
  prepend?: string | ReactElement;
  /**Add suffix */
  append?: string | ReactElement;
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input Box
 * 
 * ~~~js
 * // How to import
 * import { Input } from 'maplecomponent'
 * ~~~
 * 
 * Support HTMLInput properties.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  const cnames = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input
        ref={ref}
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
})

export default Input;
import React, {ChangeEvent, FC, InputHTMLAttributes, ReactElement} from 'react'
import classNames from 'classnames'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**设置是否禁用状态，默认为 false */
    disabled?: boolean;
    /**设置输入框大小 */
    size?: 'lg' | 'sm';
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀内容 */
    prepend?: string | ReactElement;
    /**添加后缀内容 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * import { Input } from 'yaeSakura'
 * ~~~
 */
export const Input: FC<InputProps> = props => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        ...restProps
    } = props

    const classes = classNames('input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append,
    })

    return (
        <div className={classes} style={style}>
            {
                prepend && <div className='input-group-prepend'>{prepend}</div>
            }
            {
                icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`}/></div>
            }
            <input className='input-inner' disabled={disabled} {...restProps}/>
            {
                append && <div className='input-group-append'>{append}</div>
            }
        </div>
    )
}

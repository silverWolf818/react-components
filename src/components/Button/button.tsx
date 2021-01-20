import React, {FC} from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface IButtonProps {
    /**
     * 设置自定义按钮类名
     */
    className?: string,
    /**
     * 设置按钮失效状态
     */
    disabled?: boolean,
    /**
     * 设置按钮大小
     */
    size?: ButtonSize,
    /**
     * 设置按钮类型
     */
    btnType?: ButtonType,
    /**
     * 设置按钮内容
     */
    children: React.ReactNode,
    /**
     * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
     */
    href?: string
}

type NativeButtonProps = IButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = IButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 按钮用于开始一个即时操作。
 *
 * ~~~js
 * import { Button } from 'yaeSakura'
 * ~~~
 */
export const Button: FC<ButtonProps> = props => {
    const {
        className,
        disabled,
        size,
        btnType,
        children,
        href,
        ...restProps
    } = props

    const classes = classNames('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled,
    }, className)

    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return <button
            className={classes}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    }
}

Button.defaultProps = {
    btnType: 'default',
    disabled: false,
}
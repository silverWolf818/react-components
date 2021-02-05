import React, {FC, useState, DragEvent} from 'react'
import classNames from 'classnames'

interface DraggedProps {
    onDragFile: (file: FileList) => void;
}

const Dragged: FC<DraggedProps> = props => {
    const {onDragFile, children} = props
    const [dragOver, setDragOver] = useState(false)
    const classes = classNames('uploader-dragged', {
        'is-dragover': dragOver
    })

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onDragFile(e.dataTransfer.files)
    }

    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={e => {handleDrag(e, true)}}
            onDragLeave={e => {handleDrag(e, false)}}
            className={classes}
        >
            {children}
        </div>
    )
}

export default Dragged
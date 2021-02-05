import React, {ChangeEvent, FC, useCallback, useRef, useState} from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragged from './dragged'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile) => void;
    onError?: (err: any, file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}

export const Upload: FC<UploadProps> = props => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props

    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const uploadRef = useRef<HTMLInputElement>(null)

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevState => {
            return prevState.map(file => {
                if (file.uid === updateFile.uid) {
                    return {...file, ...updateObj}
                } else {
                    return file
                }
            })
        })
    }

    const handleClick = () => {
        if (uploadRef.current) {
            uploadRef.current.click()
        }
    }

    const handleRemove = useCallback((file: UploadFile) => {
        setFileList((prevList) => prevList.filter(item => item.uid !== file.uid))
        onRemove && onRemove(file)
    }, [onRemove])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (uploadRef.current) {
            uploadRef.current.value = ''
        }
    }

    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result === true) {
                    post(file)
                } else if (result && result instanceof Promise) {
                    result.then(r => post(r))
                }
            }
        })
    }

    const post = (file: File) => {
        const _file: UploadFile = {
            uid: Math.random().toString(36).substring(2, 6),
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList(prevList => [_file, ...prevList])
        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                formData.append(key, value)
            }
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                const percentage = Math.round((e.loaded * 100) / e.total) || 0
                console.log(percentage)
                if (percentage <= 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'})
                    onProgress && onProgress(percentage, {..._file, status: 'uploading', percent: percentage})
                }
            }
        }).then(res => {
            updateFileList(_file, {status: 'success', response: res.data})
            const obj = {..._file, status: 'success', response: res.data}
            onSuccess && onSuccess(res.data, obj as UploadFile)
            onChange && onChange(obj as UploadFile)
        }).catch(err => {
            updateFileList(_file, {status: 'error', error: err})
            const obj = {..._file, status: 'error', error: err}
            onError && onError(err, obj as UploadFile)
            onChange && onChange(obj as UploadFile)
        })
    }

    return (
        <div className='upload-component'>
            <div onClick={handleClick} className="upload-input" style={{display: 'inline-block'}}>
                {
                    drag ? <Dragged onDragFile={(files) => uploadFiles(files)}>
                        {children}
                    </Dragged> : children
                }
                <input
                    ref={uploadRef}
                    className='file-input'
                    type='file'
                    onChange={handleFileChange}
                    hidden
                    multiple={multiple}
                    accept={accept}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}
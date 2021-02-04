import React, {ChangeEvent, FC, useCallback, useRef, useState} from 'react'
import axios from 'axios'
import Button from '../Button'
import UploadList from './uploadList'

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
    beforeUpload: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
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
        onRemove
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
    },[onRemove])

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
        formData.append(file.name || 'file', file)
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (e) => {
                const percentage = Math.round((e.loaded * 100) / e.total) || 0
                console.log(percentage)
                if (percentage <= 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'})
                    onProgress && onProgress(percentage, file)
                }
            }
        }).then(res => {
            updateFileList(_file, {status: 'success', response: res.data})
            onSuccess && onSuccess(res.data, file)
            onChange && onChange(file)
        }).catch(err => {
            updateFileList(_file, {status: 'error', error: err})
            onError && onError(err, file)
            onChange && onChange(file)
        })
    }
    console.log(fileList)
    return (
        <div className='upload-component'>
            <Button onClick={handleClick}>upload</Button>
            <input
                ref={uploadRef}
                className='file-input'
                type='file'
                onChange={handleFileChange}
                hidden
                multiple
            />
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}
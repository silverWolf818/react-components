import React, {ChangeEvent, FC, useRef} from 'react'
import Button from '../Button'
import axios from 'axios'

export interface UploadProps {
    action: string;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
}

export const Upload: FC<UploadProps> = props => {
    const {
        action,
        onProgress,
        onSuccess,
        onError
    } = props

    const uploadRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (uploadRef.current) {
            uploadRef.current.click()
        }
    }

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
            const formData = new FormData()
            formData.append(file.name || 'file', file)
            axios.post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (e) => {
                    const percentage = Math.round((e.loaded * 100) / e.total) || 0
                    if (percentage < 100) {
                        onProgress && onProgress(percentage, file)
                    }
                }
            }).then(res => {
                console.log(res)
                onSuccess && onSuccess(res.data, file)
            }).catch(err => {
                console.log(err)
                onError && onError(err, file)
            })
        })
    }

    return (
        <div className='upload-component'>
            <Button onClick={handleClick}>upload</Button>
            <input
                ref={uploadRef}
                className='file-input'
                type='file'
                onChange={handleFileChange}
                hidden
            />
        </div>
    )
}
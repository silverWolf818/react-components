import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import {Upload, UploadProps} from './upload'
import {fireEvent, render, RenderResult, waitFor} from '@testing-library/react'

jest.mock('../Icon', () => {
    // @ts-ignore
    return ({icon, onClick}) => {
        return <span onClick={onClick}>{icon}</span>
    }
})

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: 'url.com',
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})

describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement
        uploadArea = wrapper.queryByText('Click to upload') as HTMLInputElement
    })
    it('upload process should works fine', async () => {
        const {queryByText} = wrapper
        mockedAxios.post.mockResolvedValue({'data': 'ok'})
        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        fireEvent.change(fileInput, {target: {files: [testFile]}})
        expect(queryByText('spinner')).toBeInTheDocument()
        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
        })
        expect(queryByText('check-circle')).toBeInTheDocument()
        expect(testProps.onSuccess).toHaveBeenCalledWith('ok', expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
        }))
        expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
        }))

        //remove the uploaded file
        expect(queryByText('times')).toBeInTheDocument()
        fireEvent.click(queryByText('times') as HTMLElement)
        expect(queryByText('test.png')).not.toBeInTheDocument()
        expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
        }))
    })
    it('drag and drop files should works fine', async () => {
        const {queryByText} = wrapper
        mockedAxios.post.mockResolvedValue({'data': 'ok'})
        fireEvent.dragOver(uploadArea)
        expect(uploadArea).toHaveClass('is-dragover')
        fireEvent.dragLeave(uploadArea)
        expect(uploadArea).not.toHaveClass('is-dragover')
        fireEvent.drop(uploadArea, {
            dataTransfer: {
                files: [testFile],
            },
        })
        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument()
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('ok', expect.objectContaining({
            raw: testFile,
            status: 'success',
            name: 'test.png'
        }))
    })
})
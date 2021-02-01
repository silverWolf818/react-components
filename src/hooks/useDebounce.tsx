import {useEffect, useState} from 'react'

const useDebounce = (value: any, delay: number = 300): any => {
    const [result, setResult] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return result
}

export default useDebounce
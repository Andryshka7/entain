import type { AxiosResponse } from 'axios'

const handleRequest = async <T>(request: Promise<AxiosResponse<T>>) => {
    try {
        const response = await request
        return response.data
    } catch (error: any) {
        console.error('API request error:', error)

        if (error.response?.data?.message) {
            const customError = new Error(error.response.data.message)
            customError.name = error.response.data.error || 'Error'
            throw customError
        }

        throw error
    }
}

export { handleRequest }

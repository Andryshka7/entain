import { handleRequest } from './middleware'
import type { TMDBResponse } from '@/types'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })

const filmsApi = {
    searchFilms: async (query?: string, page?: number) =>
        await handleRequest<TMDBResponse>(api.get('/films/search', { params: { query, page } }))
}

export { filmsApi }

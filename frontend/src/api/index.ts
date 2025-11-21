import type { TMDBResponse, TMDBFilmDetails } from '@/types'
import { handleRequest } from './middleware'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })

const filmsApi = {
    searchFilms: async (query?: string, page?: number) =>
        await handleRequest<TMDBResponse>(api.get('/films/search', { params: { query, page } })),
    getFilmById: async (id: number) => await handleRequest<TMDBFilmDetails>(api.get(`/films/${id}`))
}

export { filmsApi }

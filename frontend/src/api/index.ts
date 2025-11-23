import type { TMDBResponse, TMDBFilmDetails, SearchFilmsParams } from '@/types'
import { handleRequest } from './middleware'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })

const filmsApi = {
    searchFilms: async (params: Partial<SearchFilmsParams>) =>
        await handleRequest<TMDBResponse>(api.get('/films/search', { params })),

    getFilmById: async (id: number) => await handleRequest<TMDBFilmDetails>(api.get(`/films/${id}`))
}

export { filmsApi }

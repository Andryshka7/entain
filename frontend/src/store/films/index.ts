import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { TMDBFilm } from '@/types'

interface FilmsState {
    isLoading: boolean
    searchQuery: string
    currentPage: number
    totalPages: number
    results: {
        [page: number]: TMDBFilm[]
    }
}

const initialState: FilmsState = {
    isLoading: true,
    searchQuery: '',
    currentPage: 1,
    totalPages: 5,
    results: {}
}

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
        setFilms: (
            state,
            action: PayloadAction<{
                page: number
                totalPages: number
                films: TMDBFilm[]
            }>
        ) => {
            const { page, totalPages, films } = action.payload

            return {
                ...state,
                isLoading: false,
                totalPages: Math.min(totalPages, 500),
                results: {
                    ...state.results,
                    [page]: films
                }
            }
        },
        resetFilms: (state) => {
            state.isLoading = true
            state.results = {}
            state.currentPage = 1
        }
    }
})

export const { setPage, setFilms, setSearchQuery, resetFilms } = filmsSlice.actions

export default filmsSlice.reducer

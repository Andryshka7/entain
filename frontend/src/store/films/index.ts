import type { TMDBFilm, TMDBFilmDetails } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface FilmsState {
    isLoading: boolean
    searchQuery: string

    currentPage: number
    totalPages: number

    pageResults: {
        [page: number]: TMDBFilm[]
    }

    filmDetails: {
        [id: number]: TMDBFilmDetails
    }
}

const initialState: FilmsState = {
    isLoading: true,
    searchQuery: '',
    currentPage: 1,
    totalPages: 5,
    pageResults: {},
    filmDetails: {}
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
                pageResults: { ...state.pageResults, [page]: films }
            }
        },

        setFilmDetails: (state, action: PayloadAction<TMDBFilmDetails>) => {
            state.filmDetails[action.payload.id] = action.payload
        },

        resetFilms: (state) => {
            state.isLoading = true
            state.pageResults = {}
            state.currentPage = 1
        }
    }
})

export const { setPage, setFilms, setSearchQuery, setFilmDetails, resetFilms } = filmsSlice.actions

export default filmsSlice.reducer

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { TMDBFilm } from '@/types'

interface FilmsState {
    currentPage: number
    pages: { [key: number]: TMDBFilm[] }
    totalPages: number
}

const initialState: FilmsState = {
    currentPage: 1,
    totalPages: 5,
    pages: {}
}

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
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
            state.currentPage = page
            state.totalPages = totalPages
            state.pages[page] = films
        }
    }
})

export const { setPage, setFilms } = filmsSlice.actions

export default filmsSlice.reducer

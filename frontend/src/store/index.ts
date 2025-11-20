import { configureStore } from '@reduxjs/toolkit'
import filmsReducer from './films'

const store = configureStore({
    reducer: {
        films: filmsReducer
    }
})

export default store

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { type RootState, type AppDispatch }

export * from './films'

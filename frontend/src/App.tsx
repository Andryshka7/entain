import { useAppDispatch, useAppSelector } from '@/hooks'
import { setFilms, resetFilms } from '@/store'
import { useEffect, useRef } from 'react'
import { Films } from '@/components'
import { filmsApi } from '@/api'

const App = () => {
    const dispatch = useAppDispatch()

    const { searchQuery, currentPage, results } = useAppSelector((state) => state.films)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const isFirstRender = useRef(true)

    const fetchFilms = async (query?: string, page?: number) => {
        const { total_pages: totalPages, results: films } = await filmsApi.searchFilms(query, page)
        dispatch(setFilms({ page: page ?? 1, totalPages, films }))
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            dispatch(resetFilms())
            fetchFilms(searchQuery)
        }, 500)

        return () => clearTimeout(timeoutRef.current)
    }, [searchQuery])

    useEffect(() => {
        if (results[currentPage]) return
        fetchFilms(searchQuery, currentPage)
    }, [currentPage, results])

    return <Films />
}

export default App

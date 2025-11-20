import { useDispatch } from 'react-redux'
import { Films } from '@/components'
import { setFilms } from '@/store'
import { useEffect } from 'react'
import { filmsApi } from '@/api'

const App = () => {
    const dispatch = useDispatch()

    const fetchFilms = async (query?: string, page?: number) => {
        const { total_pages: totalPages, results } = await filmsApi.searchFilms(query, page)

        dispatch(
            setFilms({
                page: page ?? 1,
                totalPages,
                films: results
            })
        )
    }

    useEffect(() => {
        fetchFilms('The Matrix')
    }, [])

    return <Films />
}

export default App

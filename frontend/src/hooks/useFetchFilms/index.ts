import type { SearchFilmsParams } from '@/types'
import { useAppDispatch } from '@/hooks'
import { setFilms } from '@/store'
import { filmsApi } from '@/api'

const useFetchFilms = () => {
    const dispatch = useAppDispatch()

    const fetchFilms = async ({ query, page }: Partial<SearchFilmsParams>) => {
        const { totalPages, results } = await filmsApi.searchFilms({
            query: query || undefined,
            page: page ?? 1
        })
        dispatch(setFilms({ page: page ?? 1, totalPages, films: results }))
    }

    return { fetchFilms }
}

export default useFetchFilms

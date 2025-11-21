import {
    FilmCard,
    FilmCardSkeleton,
    Pagination,
    PaginationSkeleton,
    SearchInput
} from './components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Film } from 'lucide-react'
import { setFilms } from '@/store'
import { useEffect } from 'react'
import { filmsApi } from '@/api'
import './index.scss'

const Films = () => {
    const dispatch = useAppDispatch()
    const { isLoading, searchQuery, currentPage, results, totalPages } = useAppSelector(
        (state) => state.films
    )

    const films = results[currentPage]
    const hasFilms = films && films.length > 0
    const isEmpty = !isLoading && films && films.length === 0
    const showPagination = totalPages > 0 && !isEmpty
    const skeletonCount = hasFilms ? films.length : 10

    const fetchFilms = async (query?: string, page?: number) => {
        const { total_pages: totalPages, results: films } = await filmsApi.searchFilms(query, page)
        dispatch(setFilms({ page: page ?? 1, totalPages, films }))
    }

    useEffect(() => {
        if (results[currentPage]) return
        fetchFilms(searchQuery, currentPage)
    }, [currentPage, results])

    return (
        <div className='films-list-container'>
            <SearchInput />
            {isEmpty ? (
                <div className='films-list-empty'>
                    <div className='films-list-empty__content'>
                        <Film className='films-list-empty__icon' size={64} />
                        <p className='films-list-empty__message'>
                            {searchQuery ? `No films found for "${searchQuery}"` : 'No films found'}
                        </p>
                        <p className='films-list-empty__hint'>
                            {searchQuery
                                ? 'Try a different search query'
                                : 'Start searching to find films'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className='films-list'>
                    {isLoading || !films
                        ? Array.from({ length: skeletonCount }).map((_, index) => (
                              <FilmCardSkeleton key={index} />
                          ))
                        : hasFilms
                          ? films.map((film) => <FilmCard key={film.id} film={film} />)
                          : null}
                </div>
            )}
            {isLoading && totalPages > 0 && !isEmpty ? (
                <PaginationSkeleton />
            ) : (
                showPagination && <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
        </div>
    )
}

export default Films

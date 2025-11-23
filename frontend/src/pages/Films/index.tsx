import {
    FilmCard,
    FilmCardSkeleton,
    Pagination,
    PaginationSkeleton,
    SearchInput
} from './components'
import { useAppSelector, useFetchFilms } from '@/hooks'
import { Film } from 'lucide-react'
import { useEffect } from 'react'
import './index.scss'

const Films = () => {
    const { isLoading, searchQuery, currentPage, pageResults } = useAppSelector(
        (state) => state.films
    )

    const films = pageResults[currentPage]

    const { fetchFilms } = useFetchFilms()

    useEffect(() => {
        if (pageResults[currentPage]) return
        fetchFilms({ query: searchQuery, page: currentPage })
    }, [currentPage, pageResults])

    return (
        <div className='films-list-container'>
            <SearchInput />
            {films?.length === 0 ? (
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
                        ? Array.from({ length: 10 }).map((_, index) => (
                              <FilmCardSkeleton key={index} />
                          ))
                        : films.map((film) => <FilmCard key={film.id} {...film} />)}
                </div>
            )}
            {isLoading ? <PaginationSkeleton /> : <Pagination />}
        </div>
    )
}

export default Films

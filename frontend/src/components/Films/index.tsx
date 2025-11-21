import { FilmCard, FilmCardSkeleton, Pagination, SearchInput } from './components'
import { useAppSelector } from '@/hooks'
import './index.scss'

const Films = () => {
    const { isLoading, currentPage, results, totalPages } = useAppSelector((state) => state.films)

    const films = results[currentPage]

    return (
        <div className='films-list-container'>
            <SearchInput />
            <div className='films-list'>
                {isLoading || !films
                    ? Array.from({ length: 10 }).map((_, index) => <FilmCardSkeleton key={index} />)
                    : films
                      ? films.map((film) => <FilmCard key={film.id} film={film} />)
                      : null}
            </div>
            {totalPages > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
        </div>
    )
}

export default Films

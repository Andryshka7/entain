import { FilmCard, FilmCardSkeleton, Pagination } from './components'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import './index.scss'

const Films = () => {
    const { currentPage, pages, totalPages } = useSelector((state: RootState) => state.films)

    const films = pages[currentPage] || []

    return (
        <div className='films-list-container'>
            <div className='films-list'>
                {films.length > 0
                    ? films.map((film) => <FilmCard key={film.id} film={film} />)
                    : Array.from({ length: 10 }).map((_, index) => (
                          <FilmCardSkeleton key={index} />
                      ))}
            </div>
            {totalPages > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
        </div>
    )
}

export default Films

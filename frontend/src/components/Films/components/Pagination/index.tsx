import { ChevronLeft, ChevronRight } from 'lucide-react'
import './index.scss'

interface Props {
    currentPage: number
    totalPages: number
}

const Pagination = ({ currentPage, totalPages }: Props) => {
    return (
        <div className='pagination'>
            <button className='pagination__button' disabled={currentPage === 1}>
                <ChevronLeft size={18} />
                <span>Previous</span>
            </button>
            <div className='pagination__pages'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`pagination__page ${currentPage === page ? 'pagination__page--active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button className='pagination__button' disabled={currentPage === totalPages}>
                <span>Next</span>
                <ChevronRight size={18} />
            </button>
        </div>
    )
}

export default Pagination


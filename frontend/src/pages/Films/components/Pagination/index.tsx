import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppDispatch } from '@/hooks'
import { setPage } from '@/store'
import './index.scss'

interface Props {
    currentPage: number
    totalPages: number
}

const Pagination = ({ currentPage, totalPages }: Props) => {
    const dispatch = useAppDispatch()

    const handlePageClick = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            dispatch(setPage(page))
        }
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1))
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            dispatch(setPage(currentPage + 1))
        }
    }
    const getVisiblePages = () => {
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
        let end = Math.min(totalPages, start + maxVisible - 1)

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1)
        }

        const pages: (number | string)[] = []

        if (start > 1) {
            pages.push(1)
            if (start > 2) {
                pages.push('ellipsis-start')
            }
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < totalPages) {
            if (end < totalPages - 1) {
                pages.push('ellipsis-end')
            }
            pages.push(totalPages)
        }

        return pages
    }

    const visiblePages = getVisiblePages()

    return (
        <div className='pagination'>
            <button
                className='pagination__button'
                disabled={currentPage === 1}
                onClick={handlePrevious}
            >
                <ChevronLeft size={18} />
                <span>Previous</span>
            </button>
            <div className='pagination__pages'>
                {visiblePages.map((page, index) => {
                    if (typeof page === 'string') {
                        return (
                            <span key={`${page}-${index}`} className='pagination__ellipsis'>
                                ...
                            </span>
                        )
                    }
                    return (
                        <button
                            key={page}
                            className={`pagination__page ${currentPage === page ? 'pagination__page--active' : ''}`}
                            onClick={() => handlePageClick(page)}
                        >
                            {page}
                        </button>
                    )
                })}
            </div>
            <button
                className='pagination__button'
                disabled={currentPage === totalPages}
                onClick={handleNext}
            >
                <span>Next</span>
                <ChevronRight size={18} />
            </button>
        </div>
    )
}

export default Pagination

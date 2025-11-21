import '../Pagination/index.scss'
import './index.scss'

const PaginationSkeleton = () => {
    return (
        <div className='pagination pagination--skeleton'>
            <div className='skeleton skeleton-button skeleton-button--prev' />
            <div className='pagination__pages'>
                <div className='skeleton skeleton-page' />
                <div className='skeleton skeleton-page' />
                <div className='skeleton skeleton-page' />
                <div className='skeleton skeleton-page' />
                <div className='skeleton skeleton-page' />
            </div>
            <div className='skeleton skeleton-button skeleton-button--next' />
        </div>
    )
}

export default PaginationSkeleton


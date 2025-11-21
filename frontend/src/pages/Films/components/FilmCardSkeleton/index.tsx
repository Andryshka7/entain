import '../FilmCard/index.scss'
import './index.scss'

const FilmCardSkeleton = () => {
    return (
        <div className='film-card film-card--skeleton'>
            <div className='film-card__poster'>
                <div className='film-card__poster-placeholder skeleton' />
                <div className='film-card__rating skeleton'>
                    <div className='skeleton-icon' />
                    <div className='skeleton-text skeleton-text--rating' />
                </div>
            </div>
            <div className='film-card__content'>
                <h3 className='film-card__title'>
                    <div className='skeleton skeleton-text skeleton-text--title' />
                </h3>
                <div className='film-card__year'>
                    <div className='skeleton skeleton-text skeleton-text--year' />
                </div>
                <div className='film-card__overview'>
                    <div className='skeleton skeleton-text skeleton-text--line' />
                    <div className='skeleton skeleton-text skeleton-text--line' />
                </div>
            </div>
        </div>
    )
}

export default FilmCardSkeleton

import './index.scss'

const FilmDetailSkeleton = () => {
    return (
        <div className='film-detail film-detail--skeleton'>
            <div className='film-detail__backdrop'>
                <div className='skeleton skeleton-backdrop' />
            </div>
            <div className='film-detail__container'>
                <div className='film-detail__back-button skeleton skeleton-button' />
                <div className='film-detail__poster'>
                    <div className='skeleton skeleton-poster' />
                </div>
                <div className='film-detail__content'>
                    <div className='film-detail__header'>
                        <div className='skeleton skeleton-text skeleton-text--title' />
                        <div className='skeleton skeleton-text skeleton-text--subtitle' />
                    </div>
                    <div className='film-detail__meta'>
                        <div className='skeleton skeleton-text skeleton-text--meta' />
                        <div className='skeleton skeleton-text skeleton-text--meta' />
                        <div className='skeleton skeleton-text skeleton-text--meta' />
                    </div>
                    <div className='film-detail__overview'>
                        <div className='skeleton skeleton-text skeleton-text--line' />
                        <div className='skeleton skeleton-text skeleton-text--line' />
                        <div className='skeleton skeleton-text skeleton-text--line' />
                        <div className='skeleton skeleton-text skeleton-text--line' />
                        <div className='skeleton skeleton-text skeleton-text--line skeleton-text--short' />
                    </div>
                    <div className='film-detail__genres'>
                        <div className='skeleton skeleton-text skeleton-text--genre' />
                        <div className='skeleton skeleton-text skeleton-text--genre' />
                        <div className='skeleton skeleton-text skeleton-text--genre' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmDetailSkeleton


import { useNavigate } from 'react-router-dom'
import type { TMDBFilm } from '@/types'
import { Star } from 'lucide-react'
import './index.scss'

const FilmCard = ({ id, title, poster_path, vote_average, release_date, overview }: TMDBFilm) => {
    const navigate = useNavigate()

    const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : null

    const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A'

    return (
        <div className='film-card' onClick={() => navigate(`/film/${id}`)}>
            <div className='film-card__poster'>
                {posterUrl ? (
                    <img src={posterUrl} alt={title} loading='lazy' />
                ) : (
                    <div className='film-card__poster-placeholder'>
                        <span>No Image</span>
                    </div>
                )}
                <div className='film-card__rating'>
                    <Star size={12} fill='currentColor' />
                    <span>{vote_average.toFixed(1)}</span>
                </div>
            </div>
            <div className='film-card__content'>
                <h3 className='film-card__title' title={title}>
                    {title}
                </h3>
                <p className='film-card__year'>{releaseYear}</p>
                {overview && (
                    <p className='film-card__overview' title={overview}>
                        {overview}
                    </p>
                )}
            </div>
        </div>
    )
}

export default FilmCard

import type { TMDBFilm } from '@/types'
import { Star } from 'lucide-react'

interface Props {
    film: TMDBFilm
}

const FilmCard = ({ film }: Props) => {
    const posterUrl = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : null

    const releaseYear = film.release_date ? new Date(film.release_date).getFullYear() : 'N/A'

    return (
        <div className='film-card'>
            <div className='film-card__poster'>
                {posterUrl ? (
                    <img src={posterUrl} alt={film.title} loading='lazy' />
                ) : (
                    <div className='film-card__poster-placeholder'>
                        <span>No Image</span>
                    </div>
                )}
                <div className='film-card__rating'>
                    <Star size={12} fill='currentColor' />
                    <span>{film.vote_average.toFixed(1)}</span>
                </div>
            </div>
            <div className='film-card__content'>
                <h3 className='film-card__title' title={film.title}>
                    {film.title}
                </h3>
                <p className='film-card__year'>{releaseYear}</p>
                {film.overview && (
                    <p className='film-card__overview' title={film.overview}>
                        {film.overview.length > 120
                            ? `${film.overview.slice(0, 120)}...`
                            : film.overview}
                    </p>
                )}
            </div>
        </div>
    )
}

export default FilmCard

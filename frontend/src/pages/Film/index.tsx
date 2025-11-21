import { ArrowLeft, Star, Calendar, Clock, Globe } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { FilmDetailSkeleton } from './components'
import type { TMDBFilmDetails } from '@/types'
import { useEffect, useState } from 'react'
import { filmsApi } from '@/api'
import './index.scss'

const Film = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [film, setFilm] = useState<TMDBFilmDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchFilm = async () => {
            if (!id) return

            try {
                setIsLoading(true)
                setError(null)
                const filmData = await filmsApi.getFilmById(parseInt(id, 10))
                setFilm(filmData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch film')
            } finally {
                setIsLoading(false)
            }
        }

        fetchFilm()
    }, [id])

    if (isLoading) {
        return <FilmDetailSkeleton />
    }

    if (error || !film) {
        return (
            <div className='film-detail-error'>
                <div className='film-detail-error__content'>
                    <p className='film-detail-error__message'>{error || 'Film not found'}</p>
                    <button className='film-detail-error__button' onClick={() => navigate('/')}>
                        <ArrowLeft size={16} />
                        Back to Films
                    </button>
                </div>
            </div>
        )
    }

    const backdropUrl = film.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${film.backdrop_path}`
        : null
    const posterUrl = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : null

    const releaseYear = film.release_date ? new Date(film.release_date).getFullYear() : 'N/A'

    const runtime = film.runtime ? `${film.runtime} min` : null

    return (
        <div className='film-detail'>
            {backdropUrl && (
                <div className='film-detail__backdrop'>
                    <img src={backdropUrl} alt={film.title} />
                    <div className='film-detail__backdrop-overlay' />
                </div>
            )}
            <div className='film-detail__container'>
                <button className='film-detail__back-button' onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                    Back
                </button>
                <div className='film-detail__poster'>
                    {posterUrl ? (
                        <img src={posterUrl} alt={film.title} />
                    ) : (
                        <div className='film-detail__poster-placeholder'>
                            <span>No Image</span>
                        </div>
                    )}
                </div>
                <div className='film-detail__content'>
                    <div className='film-detail__header'>
                        <h1 className='film-detail__title'>{film.title}</h1>
                        {film.tagline && <p className='film-detail__tagline'>{film.tagline}</p>}
                    </div>
                    <div className='film-detail__meta'>
                        <div className='film-detail__rating'>
                            <Star size={16} fill='currentColor' />
                            <span>{film.vote_average.toFixed(1)}</span>
                            <span className='film-detail__rating-count'>
                                ({film.vote_count.toLocaleString()})
                            </span>
                        </div>
                        {releaseYear !== 'N/A' && (
                            <div className='film-detail__meta-item'>
                                <Calendar size={16} />
                                <span>{releaseYear}</span>
                            </div>
                        )}
                        {runtime && (
                            <div className='film-detail__meta-item'>
                                <Clock size={16} />
                                <span>{runtime}</span>
                            </div>
                        )}
                        {film.original_language && (
                            <div className='film-detail__meta-item'>
                                <Globe size={16} />
                                <span>{film.original_language.toUpperCase()}</span>
                            </div>
                        )}
                    </div>
                    {film.overview && (
                        <div className='film-detail__overview'>
                            <h2 className='film-detail__overview-title'>Overview</h2>
                            <p>{film.overview}</p>
                        </div>
                    )}
                    {film.genres && film.genres.length > 0 && (
                        <div className='film-detail__genres'>
                            {film.genres.map((genre) => (
                                <span key={genre.id} className='film-detail__genre'>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Film

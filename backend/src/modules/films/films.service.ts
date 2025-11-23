import { Injectable, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common'
import { SearchFilmsParams, TMDBResponse } from '@/types'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { TMDB_ACCESS_TOKEN } from '@/config'
import type { Cache } from 'cache-manager'

@Injectable()
export class FilmsService {
    private readonly baseUrl: string

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        this.baseUrl = 'https://api.themoviedb.org/3'
    }

    async searchFilms(params: SearchFilmsParams) {
        const logger = new Logger('FilmsService')

        if (!TMDB_ACCESS_TOKEN) {
            logger.error('TMDB access token is not configured')
            throw new HttpException(
                'TMDB access token is not configured',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }

        try {
            const { query, page = 1 } = params

            const endpoint = !query
                ? `${this.baseUrl}/movie/popular`
                : `${this.baseUrl}/search/movie`

            const apiPage = Math.ceil(page / 2)

            const startIndex = page % 2 ? 0 : 10
            const endIndex = page % 2 ? 10 : 20

            const cacheKey = `films:${query || 'popular'}:${apiPage}`

            let responseData = await this.cacheManager.get<TMDBResponse>(cacheKey)

            if (!responseData) {
                const url = new URL(endpoint)

                url.searchParams.append('query', query || '')
                url.searchParams.append('page', String(apiPage))

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                        accept: 'application/json'
                    }
                })

                if (!response.ok) {
                    logger.error(`TMDB API error: ${response.statusText}`, response.status)
                    throw new HttpException(
                        `TMDB API error: ${response.statusText}`,
                        response.status
                    )
                }

                responseData = (await response.json()) as TMDBResponse

                await this.cacheManager.set(cacheKey, responseData)
            } else {
                logger.log(`Cache hit for query: ${query}, API page: ${apiPage}`)
            }

            const slicedResults = responseData.results?.slice(startIndex, endIndex) || []

            const totalPages = responseData.total_pages ? responseData.total_pages * 2 : 1

            return {
                page,
                results: slicedResults,
                totalResults: responseData.total_results,
                totalPages
            }
        } catch (error) {
            logger.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getFilmById(id: number) {
        const logger = new Logger('FilmsService')

        try {
            if (!TMDB_ACCESS_TOKEN) {
                logger.error('TMDB access token is not configured')
                throw new HttpException(
                    'TMDB access token is not configured',
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }

            const cacheKey = `film:${id}`

            let filmData = await this.cacheManager.get(cacheKey)

            if (!filmData) {
                const url = `${this.baseUrl}/movie/${id}`

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                        accept: 'application/json'
                    }
                })

                if (!response.ok) {
                    logger.error(`TMDB API error: ${response.statusText}`, response.status)
                    throw new HttpException(
                        `TMDB API error: ${response.statusText}`,
                        response.status
                    )
                }

                filmData = await response.json()
                await this.cacheManager.set(cacheKey, filmData)
            } else {
                logger.log(`Cache hit for film ID: ${id}`)
            }

            return filmData
        } catch (error) {
            logger.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

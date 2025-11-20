import { Injectable, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common'
import { SearchFilmsParams, TMDBResponse } from '@/types'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { TMDB_ACCESS_TOKEN } from '@/config'
import type { Cache } from 'cache-manager'

@Injectable()
export class FilmsService {
    private readonly baseUrl = new URL('https://api.themoviedb.org/3/search/movie')

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async searchFilms(params: SearchFilmsParams) {
        const logger = new Logger('FilmsService')

        try {
            const { query = '', page = 1 } = params

            if (!TMDB_ACCESS_TOKEN) {
                throw new HttpException(
                    'TMDB access token is not configured',
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }

            const apiPage = Math.ceil(page / 2)

            const startIndex = page % 2 === 1 ? 0 : 10
            const endIndex = page % 2 === 1 ? 10 : 20

            const cacheKey = `films:${query}:${apiPage}`

            let responseData = await this.cacheManager.get<TMDBResponse>(cacheKey)

            if (!responseData) {
                const url = new URL(this.baseUrl.toString())

                url.searchParams.append('query', query)
                url.searchParams.append('page', apiPage.toString())

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                        accept: 'application/json'
                    }
                })

                if (!response.ok) {
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
                ...responseData,
                page,
                results: slicedResults,
                total_pages: totalPages
            }
        } catch (error) {
            logger.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

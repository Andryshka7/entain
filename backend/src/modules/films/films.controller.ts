import { Controller, Get, Query, Param } from '@nestjs/common'
import { FilmsService } from './films.service'
import { SearchFilmsParams } from '@/types'

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get('search')
    async searchFilms(@Query('query') query: string, @Query('page') page?: string) {
        const params: SearchFilmsParams = {
            query,
            page: page ? parseInt(page, 10) : undefined
        }

        return this.filmsService.searchFilms(params)
    }

    @Get(':id')
    async getFilmById(@Param('id') id: string) {
        return this.filmsService.getFilmById(parseInt(id, 10))
    }
}

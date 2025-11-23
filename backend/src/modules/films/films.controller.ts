import { Controller, Get, Query, Param } from '@nestjs/common'
import { FilmsService } from './films.service'
import { SearchFilmsParams } from '@/types'

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get('search')
    async searchFilms(@Query('query') query: string, @Query('page') page?: number) {
        return this.filmsService.searchFilms({ query, page })
    }

    @Get(':id')
    async getFilmById(@Param('id') id: number) {
        return this.filmsService.getFilmById(id)
    }
}

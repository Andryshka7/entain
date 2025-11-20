import { FilmsController } from './films.controller'
import { CacheModule } from '@nestjs/cache-manager'
import { FilmsService } from './films.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [CacheModule.register()],
    controllers: [FilmsController],
    providers: [FilmsService],
    exports: [FilmsService]
})
export class FilmsModule {}

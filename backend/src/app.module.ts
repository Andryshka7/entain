import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LoggingMiddleware } from './middleware'
import { FilmsModule } from './modules'

@Module({
    imports: [FilmsModule],
    controllers: [],
    providers: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*')
    }
}

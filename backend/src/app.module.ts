import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LoggingMiddleware } from './middleware'

@Module({
    imports: [],
    controllers: [],
    providers: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*')
    }
}

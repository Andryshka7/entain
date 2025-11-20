import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

const PORT = process.env.PORT ?? 3000

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose']
    })

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true
    })

    const logger = new Logger('Bootstrap')

    await app.listen(Number(PORT))

    logger.log('🚀 Server successfully started!')
    logger.log(`📍 Listening on http://localhost:${Number(PORT)}`)
}
bootstrap()

import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private readonly logger = new Logger('Request')

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req
        const url = originalUrl.split('?')[0]

        const startTime = Date.now()

        res.on('finish', () => {
            const { statusCode } = res
            const duration = Date.now() - startTime

            this.logger.log(`${method} ${url} ${statusCode} - ${duration}ms`)
        })

        next()
    }
}

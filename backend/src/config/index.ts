import dotenv from 'dotenv'

dotenv.config()

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN

export { TMDB_ACCESS_TOKEN }
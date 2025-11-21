interface SearchFilmsParams {
    query: string
    page?: number
}

interface TMDBFilm {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

interface TMDBResponse {
    page: number
    results: TMDBFilm[]
    total_pages: number
    total_results: number
}

interface TMDBGenre {
    id: number
    name: string
}

interface TMDBProductionCompany {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}

interface TMDBProductionCountry {
    iso_3166_1: string
    name: string
}

interface TMDBSpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

interface TMDBFilmDetails {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string | null
        backdrop_path: string | null
    } | null
    budget: number
    genres: TMDBGenre[]
    homepage: string | null
    id: number
    imdb_id: string | null
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    production_companies: TMDBProductionCompany[]
    production_countries: TMDBProductionCountry[]
    release_date: string
    revenue: number
    runtime: number | null
    spoken_languages: TMDBSpokenLanguage[]
    status: string
    tagline: string | null
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export type { SearchFilmsParams, TMDBFilm, TMDBResponse, TMDBFilmDetails }

import { useAppDispatch, useAppSelector } from '@/hooks'
import { resetFilms, setSearchQuery } from '@/store'
import { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import './index.scss'

const SearchInput = () => {
    const dispatch = useAppDispatch()
    const searchQuery = useAppSelector((state) => state.films.searchQuery)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => dispatch(resetFilms()), 500)

        return () => clearTimeout(timeoutRef.current)
    }, [searchQuery])

    return (
        <div className='films-search'>
            <div className='films-search__wrapper'>
                <Search className='films-search__icon' size={20} />
                <input
                    type='text'
                    className='films-search__input'
                    placeholder='Search films...'
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
            </div>
        </div>
    )
}

export default SearchInput

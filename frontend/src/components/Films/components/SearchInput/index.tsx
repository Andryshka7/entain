import { useAppDispatch, useAppSelector } from '@/hooks'
import { setSearchQuery } from '@/store'
import { Search } from 'lucide-react'
import './index.scss'

const SearchInput = () => {
    const dispatch = useAppDispatch()
    const searchQuery = useAppSelector((state) => state.films.searchQuery)

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

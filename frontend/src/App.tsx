import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Films, Film } from '@/pages'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Films />} />
                <Route path='/film/:id' element={<Film />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

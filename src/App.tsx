import { Routes, Route } from 'react-router-dom'
import Home from './components/Pages/Home'
import Details from './components/Details/Details'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details' element={<Details />} />
    </Routes>
    </>
  )
}

export default App

import {BrowserRouter as Router,Route ,Routes} from 'react-router-dom'
import './App.css'
import First from './components/First'
import Main from './components/Main'
import Nav from './components/Nav'
import Practice from './components/Practice'
function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<First/>}/>
        <Route path="/home" element={<Main/>}/>
      </Routes>
    </Router>
  )
}

export default App

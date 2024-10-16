import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Landing from './pages/Landing'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router>
          <Navbar />
          <Routes>
          <Route path="/" exact element={<Landing />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
        
      </Provider>
    </>
  )
}

export default App

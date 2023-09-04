import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import Footer from './Pages/Footer/Footer';
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/SignUp/SignUp';
import { useEffect } from 'react';
import './App.css';
import Admin from './Pages/Admin/Admin';
import Boardd from './Pages/Sudoku/Boardd';
import Feedback from './Pages/Feedback/Feedback';
import Users from './Pages/Players/Players';
import FeedbackTable from './Pages/FeedbackTable/FeedbackTable';
import HowToPlay from './Pages/HowToPlay/HowToPlay';
import SudokuFacts from './Pages/SudokuFacts/SudokuFacts';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Update from './Pages/Update/Update';
import WinStatus from './Pages/WinStatus/WinStatus';
import ContactUs from './Pages/ContactUs/ContactUs';

function App() {
  useEffect(() => {
    document.title = "SUDOKU"; 
  }, []);
  return (
    
    <div className='root'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/howtoplay' element={<HowToPlay/>} />
          <Route path='/sudokufacts' element={<SudokuFacts/>} />
          <Route path='/Admin' element={<Admin/>} />
          <Route path='/Feedback' element={<Feedback/>} />
          <Route path='/FeedbackTable' element={<FeedbackTable/>} />
          <Route path='/Boardd' element={<Boardd/>} />
          <Route path='/players' element={<Users/>} />
          <Route path='/update' element={<Update/>} />
          <Route path='/winstatus' element={<WinStatus/>} />
          <Route path='*' element={<PageNotFound/>} />
          <Route path='/contactus' element={<ContactUs/>} />
        </Routes>
      <Footer />
      </BrowserRouter>
      <ToastContainer position='bottom-right' theme='colored' />
    </div>
  );
}

export default App;

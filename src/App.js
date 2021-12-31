import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Categories } from './components/Categories';
import { List } from './components/List';
import { Details } from './components/Details';

function App() {
  return (
    <Router>
      <div>
        <>
          <h1 className='title'>My Meals</h1>
          <div className='banner'>
            <img src="/banner.jpg" />
          </div>
        </>
        <Routes>
          <Route path="/" exact element={<Categories />} />
          <Route path="/categories/:id" exact element={<List />} />
          <Route path="/details/:id" exact element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

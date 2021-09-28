import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import RegisterPage from './Components/Pages/RegisterPage';
import SearchPage from './Components/Pages/SearchPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/register' exact component={RegisterPage} />
          <Route path='/search' exact component={SearchPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

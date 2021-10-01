import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import HomePage from './Components/Pages/HomePage';
import SearchPage from './Components/Pages/SearchPage';
import AuthenticationPage from './Components/Pages/AuthenticationPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route path='/' exact component={HomePage} /> */}
          <Route path='/authentication' exact component={AuthenticationPage} />
          <Route path='/search' exact component={SearchPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

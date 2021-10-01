import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchPage from './Components/Pages/SearchPage';
import AuthenticationPage from './Components/Pages/AuthenticationPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={AuthenticationPage} />
          {/* I'm gonna to use createContext() for alowing to go to the Search Page only Authenticated user */}
          <Route path='/search' exact component={SearchPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

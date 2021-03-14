import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import MyList from './pages/MyList'
import PokemonList from './pages/PokemonList'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={PokemonList} />
          <Route path='/my-list' component={MyList} />
        </Switch>
      </Router>
    </>    
  );
}

export default App;

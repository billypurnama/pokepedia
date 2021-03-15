import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import MyList from './pages/MyList'
import PokemonList from './pages/PokemonList'
import PokemonDetail from './pages/PokemonDetail'
import { 
  ApolloClient, 
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client'

const link = from([
  new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql' })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/my-list' component={MyList} />
          <Route path='/' exact component={PokemonList} />
          <Route path='/pokemon-detail' component={PokemonDetail} />
        </Switch>
      </Router>
    </ ApolloProvider>    
  );
}

export default App;

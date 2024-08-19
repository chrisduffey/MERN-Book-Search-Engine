import './App.css';
import { Outlet, Router } from 'react-router-dom';

import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks'
import Navbar from './components/Navbar';
import { link } from '../../../../UR-VIRT-FSF-PT-02-2024-U-LOLC/21-MERN/02-Challenge/Develop/server/routes';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, {headers}) =>{
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: '',
    },
  };
});

const client = new ApolloClient ({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
      <Navbar />
      <Outlet />
      
    </>
    </Router>
    </ApolloProvider>
  );
}

export default App;

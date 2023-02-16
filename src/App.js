import { ApolloProvider } from '@apollo/client';
import DropMail from './Pages/main';
import client from './server/Apollo_client';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <DropMail></DropMail>
    </ApolloProvider>
  );
}

export default App;

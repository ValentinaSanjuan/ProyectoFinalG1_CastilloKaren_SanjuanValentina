import './App.css'
import Header from './Componentes/Header/Header'
import Main from './Componentes/Main/Main'
import Footer from './Componentes/Footer/Footer'
import { AuthProvider } from './Componentes/Context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <Router>
        
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
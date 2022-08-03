// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import Register from './pages/register/register';
import Container from './components/layout/Container';
import Login from './pages/login/login';
import Home from './pages/home/home'
import PrivateRoute from './services/wAuth'
import UsuarioEditar from './pages/users/usuarios.editar';
import UsuariosListagem from './pages/users/index'

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Container customClass="min-height">
        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<UsuariosListagem />} />

          <Route
            path="/admin/usuarios"
            element={
              <PrivateRoute redirectTo="/">
                <UsuariosListagem />
              </PrivateRoute>
            }
          />

          <Route path="/admin/usuarios/editar/:idUsuario" element={
            <PrivateRoute redirectTo="/">
              <UsuarioEditar />
            </PrivateRoute>
          }
          />

        </Routes>
      </Container>

    </BrowserRouter>
  );
}

export default App;

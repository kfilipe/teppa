import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import ImgAdmin from '../../../assets/img/GERAL.png'
import MenuAdmin from '../../components/menu-admin';
import Footer from '../../components/footer-admin'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import api from '../../services/api';

import { useParams } from 'react-router-dom'



const mdTheme = createTheme();

export default function UsuarioEditar() {

    const [nome, setNome] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [tipo, setTipo] = React.useState('')

    const { idUsuario } = useParams()

    React.useEffect(() => {
        async function getUsuario() {
            const response = await api.get('http://localhost:5000/api/usuarios.details/' + idUsuario)

            setNome(response.data.nome_usuario);
            setEmail(response.data.email_usuario);
            setSenha(response.data.senha_usuario);
            setTipo(response.data.tipo_usuario);
        }
        getUsuario()
    }, [])

    async function handleSubmit() {
        const data = {
            nome_usuario: nome,
            email_usuario: email,
            senha_usuario: senha,
            tipo_usuario: tipo,
            _id: idUsuario
        }



        if (nome !== '' && email !== '' && senha !== '' && tipo !== '') {
            const response = await api.put('http://localhost:5000/api/usuarios', data)

            if (response.status === 200) {
                window.location.href = '/admin/usuarios'
            } else {
                alert('Error ao atualizar o usuário')
            }
        } else {
            alert('Preencha todos os dados!')
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <MenuAdmin title={'Usuários'} />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                        {/* Usar a Grid abaixo para inserção de dados */}

                        <Grid container spacing={3}>
                            <Grid item sm={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 300,
                                    }}
                                >
                                    <h2>Atualização de Usuários</h2>
                                    <Grid container spacing={3}>

                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="nome"
                                                name="nome"
                                                label="Nome Completo"
                                                fullWidth
                                                autoComplete="nome"
                                                variant="standard"
                                                value={nome}
                                                onChange={e => setNome(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="email"
                                                name="email"
                                                label="Email"
                                                fullWidth
                                                autoComplete="email"
                                                variant="standard"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </Grid>

                                        {/* <Grid item xs={12} sm={3}>
                                            <FormControl variant="standard" fullWidth>
                                                <InputLabel id="labelTipo">Perfil</InputLabel>
                                                <Select
                                                    labelId="labelTipo"
                                                    id="tipo"
                                                    value={tipo}
                                                    onChange={e => setTipo(e.target.value)}
                                                    label="Perfil"
                                                >
                                                    <MenuItem value="">
                                                        <em>Escolha um perfil</em>
                                                    </MenuItem>
                                                    <MenuItem value={1}>Administrador</MenuItem>
                                                    <MenuItem value={2}>Funcionário</MenuItem>
                                                    <MenuItem value={3}>Gerente</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid> */}

                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="password"
                                                required
                                                id="senha"
                                                name="senha"
                                                label="Senha"
                                                fullWidth
                                                autoComplete="senha"
                                                variant="standard"
                                                value={senha}
                                                onChange={e => setSenha(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                                Atualizar
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            </Grid>

                        </Grid>


                        <Footer sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

// export default function Dashboard() {
//     return <UsuarioCadastrar />;
// }
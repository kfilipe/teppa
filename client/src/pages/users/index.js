import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuAdmin from '../../components/menu-admin';
import Footer from '../../components/footer-admin'
import { Button, ButtonGroup, Chip, Paper } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import api from '../../services/api';


const mdTheme = createTheme();

function UsuariosListagem() {

    const [usuarios, setUsuarios] = React.useState([])

    React.useEffect(() => {
        async function loadUsuarios() {
            const response = await api.get('http://localhost:5000/api/usuarios')
            console.log(response.data)
            setUsuarios(response.data)
        }
        loadUsuarios();
    }, [])

    async function handleDelete(id) {
        if (window.confirm("Deseja excluir este usuário?")) {
            const result = await api.delete('http://localhost:5000/api/usuarios/' + id)
            if (result.status === 200) {
                window.location.href = 'http://localhost:3000/admin/usuarios'
            } else {
                alert('Ocorreu um erro. Por favor, tente novamente!')
            }
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>

                <MenuAdmin title={'usuários'} />

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
                                    <h2>Lista de Usuários</h2>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">Nome</TableCell>
                                                            <TableCell align="center">Email</TableCell>
                                                            <TableCell align="center">Perfil</TableCell>
                                                            <TableCell align="center">Data de Cadastro</TableCell>
                                                            <TableCell align="right">Opções</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {usuarios.map((row) => (
                                                            <TableRow
                                                                key={row._id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {row.nome_usuario}
                                                                </TableCell>
                                                                <TableCell align="center">{row.email_usuario}</TableCell>
                                                                <TableCell align="center">
                                                                    {row.tipo_usuario === 1 ?
                                                                        <Chip
                                                                            label="Administrador"
                                                                            color="primary"
                                                                        />
                                                                        :
                                                                        <Chip
                                                                            label="Funcionário"
                                                                            color="secondary"
                                                                        />

                                                                    }

                                                                </TableCell>
                                                                <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                                                <TableCell align="right">
                                                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                                        <Button color="primary" href={'/admin/usuarios/editar/' + row._id} size="small">Atualizar</Button>
                                                                        <Button color="secondary" onClick={() => handleDelete(row._id)} size="small">Excluir</Button>
                                                                    </ButtonGroup>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
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

export default function Dashboard() {
    return <UsuariosListagem />;
}
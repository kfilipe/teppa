import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';

import { getToken, logout } from '../services/auth'
import api from "../services/api"

export const mainListItems = (
    <React.Fragment>
        <ListItemButton href="#" >
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton href="/admin/usuarios" >
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
        </ListItemButton>
        <ListItemButton href="#">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Opções
        </ListSubheader>
        <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
        </ListItemButton>
    </React.Fragment>
);

async function handleLogout() {
    if (window.confirm("Deseja sair?")) {
        const response = await api.get("http://localhost:5000/api/usuarios/destroytoken", { headers: { token: getToken() } })
        if (response.status === 200) {
            logout()
            window.location.href = "/"
        }
    } else {
        alert('Não foi possivel encerrar a sessão!')
    }
}
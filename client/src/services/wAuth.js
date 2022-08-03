import React, { useEffect, useState } from 'react';
import api from './api';
import { logout, getToken } from './auth';
import { Navigate } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function WAuth({ children, redirectTo }) {
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verify() {
            var res = await api.get('http://localhost:5000/api/usuarios/checktoken', { params: { token: getToken() } });

            if (res.data.status === 200) {
                setLoading(false);
                setRedirect(false);
                console.log('Autenticado')
            } else {
                logout();
                setLoading(false);
                setRedirect(true);
                console.log('Não Autorizado')
            }
        }
        // setTimeout(() => verify(), 1000);
        verify();
    }, [])

    return (
        loading ? <LinearProgress style={{ width: '50%', margin: '80px auto' }} />
            : !redirect ? children : <Navigate to={redirectTo} />
    )
}
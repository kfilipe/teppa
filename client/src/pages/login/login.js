import { useState } from 'react'
import styles from './login.module.css'
import { setNomeUsuario, login, setIdUsuario, setLastnameUsuario } from '../../services/auth';
import api from '../../services/api';


export default function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        await api.post('http://localhost:5000/api/usuarios/login', { email, senha })
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1) {
                        login(res.data.token);
                        setIdUsuario(res.data.id_client);
                        setNomeUsuario(res.data.user_name);
                        setLastnameUsuario(res.data.user_lastname);

                        window.location.href = '/home'
                        console.log('Para a home')
                    } else if (res.data.status === 2) {
                        alert('Atenção: ' + res.data.error);
                        console.log('Status 2')
                    }
                    setLoading(false);
                    console.log('Aqui')
                } else {
                    alert('Erro no servidor');
                    setLoading(false);
                    console.log('Error no servidor')
                }
            })
    }

    return (
        <>

            <div class={styles.container}>
                <div id="login">
                    <h1>Login</h1>
                </div>

                <form>
                    <label for="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="@email.com"
                        autocomplete="off"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label for="pass">Senha:</label>
                    <input
                        type="password"
                        name="pass"
                        id="pass"
                        placeholder="Digite sua senha..."
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                </form>

                <div id={styles.forgotPass}>
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <br /><br />

                <input className={styles.loginSubmit} type="submit" value="Login" onClick={handleSubmit} />

                <div class="register">
                    <p>Ainda não tem uma conta?</p>
                    <br />
                    <a href="/register">Registrar</a>
                </div>

            </div>

        </>
    )
}
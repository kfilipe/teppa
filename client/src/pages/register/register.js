import { useState } from 'react'
import styles from './Register.module.css'
import api from '../../services/api'

export default function Register() {

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [passConfirm, setPassConfirm] = useState('')

    async function handleSubmit(e) {

        const data = {
            nome_usuario: name,
            lastname_usuario: lastname,
            email_usuario: email,
            senha_usuario: senha,
        }

        if (passConfirm !== "" && senha !== passConfirm) {
            alert('Senhas não conferem')
            e.preventDefault()
        } else {
            const response = await api.post('http://localhost:5000/api/usuarios', data)
            if (response.status === 200) {
                window.location.href = '/'
            } else {
                alert('Error ao cadastrar o usuário')
            }
        }
    }

    return (
        <>
            <div id={styles.mainContainer}>
                <h1>Cadastre-se para acessar o sistema</h1>
                <form id="register-form" action="">

                    <div className={styles.fullBox}>
                        <label for="email">E-mail</label>
                        <input
                            type="email"
                            name="email" id="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            minLength={4}
                            data-email-validate
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.halfBoxspacing}>
                        <label for="name">Nome</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Digite seu nome"
                            pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                            value={name}
                            minLength={2}
                            maxLength={20}
                            required
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.halfBox}>
                        <label for="lastname">Sobrenome</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={lastname}
                            placeholder="Digite seu sobrenome"
                            required
                            pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                            onChange={e => setLastname(e.target.value)}
                        />
                    </div>

                    <div className={styles.halfBoxspacing}>
                        <label for="lastname">Senha</label>
                        <input
                            type="senha"
                            name="senha"
                            id="senha"
                            placeholder="Digite sua senha"
                            value={senha}
                            required
                            onChange={e => setSenha(e.target.value)}
                        />
                    </div>

                    <div className={styles.halfBox}>
                        <label for="passconfirmation">Confirmação de senha</label>
                        <input
                            type="senha"
                            name="passconfirmation"
                            id="senhaconfirmation"
                            placeholder="Digite novamente sua senha"
                            value={passConfirm}
                            required
                            onChange={e => setPassConfirm(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="agreement"
                            id={styles.agreement}
                        />
                        <label for="agreement" id={styles.agreementLabel}>Eu li e aceito os <a href="#">termos de uso</a></label>
                    </div>


                </form>
                <div>

                    <div class="register">
                        <input className={styles.registerSubmit} type="submit" value="Registrar" onClick={handleSubmit} />
                        <p>Já possui uma conta?</p>
                        <br />
                        <a href="/">Login</a>
                    </div>
                </div>
            </div >
        </>
    )
}
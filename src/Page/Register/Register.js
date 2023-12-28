import React, {useState} from 'react';
import './register_style.css';
import {useNavigate} from "react-router-dom";
export const Register = () => {
    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const register = async e => {
        e.preventDefault()

        try {
            const userData = {
                username: userLogin,
                password: userPassword,
                email: userEmail
            }

            const response = await fetch('http://192.168.0.105:5000/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }
            )

            if(response.ok) {
                navigate('/login')
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <>
            <form className="backgroundReg">
                <h3>Регистрация</h3>
                <label htmlFor="email">Имя пользователя</label>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    id="username"
                    onChange={(e) => setUserLogin(e.target.value)}
                />

                <label htmlFor="email">Почта</label>
                <input
                    type="email"
                    placeholder="Почта"
                    id="email"
                    onChange={(e) => setUserEmail(e.target.value)}
                />

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    placeholder="Пароль"
                    id="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                />

                <div className="error">{error}</div>

                <button className="login" onClick={register}>Войти</button>

                <article className="link_register">
                    <h4>Есть аккаунт?</h4>
                    <button className="register" onClick={() => navigate('/login')}>Войти</button>
                </article>
            </form>
        </>
    );
};

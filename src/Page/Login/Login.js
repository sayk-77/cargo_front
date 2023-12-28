import React, {useState} from 'react';
import './login_style.css';
import {useNavigate} from "react-router-dom";
export const Login = () => {
    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const login = async e => {
        e.preventDefault()
        try {
            if (userLogin.length === 0 || userPassword.length === 0) {
                setError('Введите данные')
                return
            }
            const userData = {
                username: userLogin,
                password: userPassword
            }

            const response = await fetch('http://192.168.0.105:5000/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }
            )

            const data = await response.json()
            if(data.success) {
                navigate('/home')
            } else {
                setError(data.message)
            }

        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <>
            <form className="backgroundLog">
                <h3>Вход</h3>
                <label htmlFor="email">Имя пользователя</label>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    id="email"
                    onChange={(e) => setUserLogin(e.target.value)}
                />

                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    placeholder="Пароль"
                    id="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                />

                <div className='error'>{error}</div>

                <button className="login" onClick={login}>Войти</button>

                <article className="link_register">
                    <h4>Нет аккаунта?</h4>
                    <button className="register" onClick={() => navigate('/register')}>Регистрация</button>
                </article>
            </form>
        </>
    );
};

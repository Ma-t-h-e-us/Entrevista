import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//img
import people_login from '../assets/img/people_login.png';
import background_form from '../assets/img/background_form.png';

//css
import '../assets/css/pages.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useNavigate();

    const fazerLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/Login', {
            email : email,
            senha : password
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('token', resposta.data.token);
                    history('/Home');
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className='AllContent'>
            <header>
                <div className='container contentHeader'>
                    <span>UsersData</span>
                    <span>Matheus Martins Nascimento</span>
                    {/* <Link to="/registerUser"><button>Cadastre-se</button></Link> */}
                </div>
            </header>
            <div className='mainContent container'>
                <div className='content1'>
                    <div className='tittle'>
                        <h1>UsersData</h1>
                        <h4>Por Matheus :)</h4>
                    </div>
                    <img src={people_login} alt="desenhos de pessoas" />
                </div>
                <div className='content2'>
                    <div className='loginArea'>
                        <h3>Faça seu login</h3>
                        <form className='loginData' >
                            <div className='inputArea'>
                                <label>Email:</label>
                                <input className='input' value={email} onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder='Digite seu email' />
                            </div>
                            <div className='inputArea'>
                                <label>Senha:</label>
                                <input className='input' value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Digite sua senha' />
                            </div>
                            <button onClick={(e) => fazerLogin(e)} className='buttonLogin' type='submit'>Acessar</button>
                            {/* <Link to="/registerUser"><span>Cadastre-se agora</span></Link> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
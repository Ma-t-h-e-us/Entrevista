import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from '../services/auth';

//img
import people_login from '../assets/img/people_login.png';
import background_form from '../assets/img/background_form.png';

//css
import '../assets/css/pages.css'


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState(1);

    let history = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        history("/")
    }

    const cadastrar = (e) => {
        e.preventDefault();
        if (usuarioAutenticado() === true && parseJwt().role === '2' || parseJwt().role === '3') {
            axios.post('http://localhost:5000/api/UserUControllers', {
                idType: userType,
                idStatus: 1,
                nameUser: username,
                email: email,
                passwd: password,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(resposta => {
                    if (resposta.status === 201) {
                        alert('Usuário Criado com sucesso');
                        setEmail('')
                        setPassword('')
                        setUsername('')
                        setUserType(1)
                    }
                })
                .catch((erro) => console.log(erro));
        } else {
            alert('Não pode cadastrar agora')
        }
    }

    return (
        <div className='AllContent'>
            <header>
                <div className='container contentHeader'>
                    <span>UsersData</span>
                    <span>Matheus Martins Nascimento</span>
                    {usuarioAutenticado() === true ? <span onClick={(event) => logout()}>Sair</span> : null}
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
                    <div className='registerArea'>
                        <h3>Cadastre um usuário</h3>
                        <form className='registerData' >
                            <div className='inputArea'>
                                <label>Email:</label>
                                <input className='input' value={email} onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder='Digite o email' />
                            </div>
                            <div className='inputArea'>
                                <label>Senha:</label>
                                <input className='input' value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Digite a senha' />
                            </div>
                            <div className='inputArea'>
                                <label>Nome:</label>
                                <input className='input' value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="name" placeholder='Digite o nome' />
                            </div>
                            <div className='inputArea'>
                                <label>Tipo de usuário:</label>
                                <select value={userType} onChange={(e) => setUserType(e.target.value)} className='input' name="userType" id="">
                                    <option value='1'>Geral</option>
                                    <option value='2'>Administrador</option>
                                    <option value='3'>Root</option>
                                </select>
                            </div>
                            <button className='buttonLogin' onClick={(e) => cadastrar(e)} type='submit'>Cadastrar</button>
                            {/* <Link to="/registerUser"><span>Cadastre-se agora</span></Link> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
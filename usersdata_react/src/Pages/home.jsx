import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from '../services/auth';
import Modal from 'react-modal';

//img
import people_login from '../assets/img/people_login.png';
import background_form from '../assets/img/background_form.png';

//css
import '../assets/css/pages.css'

//icons
import * as IoIcons from 'react-icons/io5'
import * as TbExchange from 'react-icons/tb'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'

const steps = [
    {
        id: 'Step1'
    },
    {
        id: 'Step2'
    },
    {
        id: 'Step3'
    },
    {
        id: 'Step4'
    }
];

const CustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '90vh',
        background: '#FFF',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
        borderRadius: '30px'
    },
};

Modal.setAppElement('#root');

export default function Home() {
    const [currentStep, setCurrentStep] = useState(0);
    const [userLogado, setUserLogado] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [userAlterado, setUserAlterado] = useState(userLogado);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');
    const [status, setStatus] = useState('')

    let history = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        history("/")
    }

    const ListMe = () => {
        axios.get('http://localhost:5000/api/UserUControllers/ListMe/' + parseJwt().jti, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setUserLogado(resposta.data)
                    setUserAlterado(resposta.data)
                    setEmail(resposta.data.email)
                    setPassword(resposta.data.passwd)
                    setUsername(resposta.data.nameUser)
                    setUserType(resposta.data.idType)
                    setStatus(resposta.data.idStatus)
                    console.log(resposta.data)
                }
            })
            .catch((erro) => console.log(erro));
    }

    useEffect(ListMe, []);

    const ListUsers = () => {
        if (parseJwt().role == '2' || parseJwt().role == '3') {
            axios.get('http://localhost:5000/api/UserUControllers/ListAll', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(resposta => {
                    if (resposta.status === 200) {
                        setAllUsers(resposta.data);
                        console.log(resposta.data);
                    }
                })
                .catch((erro) => console.log(erro));
        }
    }

    useEffect(ListUsers, []);

    const deleteUser = (idUser) => {
        if (parseJwt().role == '3') {
            axios.delete('http://localhost:5000/api/UserUControllers/' + idUser, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(resposta => {
                    if (resposta.status === 204) {
                        alert("Usuário deletado com sucesso")
                        ListUsers();
                    }
                })
                .catch((erro) => console.log(erro));
        }
    }

    const alterStatus = (idUser) => {
        if (parseJwt().role == '3' || parseJwt().role == '2') {
            axios.patch('http://localhost:5000/api/UserUControllers/AlterStatus/' + idUser, {}, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(resposta => {
                    if (resposta.status === 204) {
                        alert("Status alterado com sucesso")
                        ListUsers();
                    }
                })
                .catch((erro) => console.log(erro));
        }
    }

    const alterarDados = () => {
        axios.put('http://localhost:5000/api/UserUControllers', {
            idUser: userLogado.idUser,
            idType: userType,
            idStatus: status,
            nameUser: username,
            email: email,
            passwd: password
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(resposta => {
                if(resposta.status === 204){
                    alert('Dados alterados com sucesso')
                    setModal(false);
                    ListMe();
                }
            })
            .catch((erro) => console.log(erro));
    }

    return (
        <div>
            <header>
                <div className='container contentHeader'>
                    <span>UsersData</span>
                    <span>Matheus Martins Nascimento</span>
                    {usuarioAutenticado() === true ? <span onClick={(event) => logout()}>Sair</span> : null}
                    {/* <Link to="/registerUser"><button>Cadastre-se</button></Link> */}
                </div>
            </header>
            <nav className='container navArea'>
                <span onClick={(event) => setCurrentStep(0)} b>Meus Dados</span>
                {parseJwt().role == '2' || parseJwt().role == '3' ? <span onClick={(event) => setCurrentStep(1)}>Usuários</span> : null}
            </nav>
            {
                steps[currentStep].id === "Step1" && (
                    <div className='container userContent'>
                        <div>
                            <label>Nome: </label>
                            <span>{userLogado.nameUser}</span>
                        </div>
                        <hr />
                        <div>
                            <label>Email: </label>
                            <span>{userLogado.email}</span>
                        </div>
                        <hr />
                        <div>
                            <label>Tipo de usuário: </label>
                            <span>{userLogado.idType}</span>
                        </div>
                        <hr />
                        <div>
                            <label>Status: </label>
                            {userLogado.idStatus === 1 ? <span className='ativo'>Ativo</span> : <span className='inativo'>Inativo</span>}
                        </div>
                        <hr />
                        <div>
                            <label>Senha:</label>
                            <span>{userLogado.passwd}</span>
                        </div>
                        <div className='editIcon' onClick={() => setModal(true)}>
                            <BiIcons.BiEdit />
                        </div>
                        {
                            modal === true ? 
                            <form className='alterarDadosArea' >
                                <AiIcons.AiOutlineClose className='closeModal' onClick={() => setModal(false)} />
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
                                    <input className='input' value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder='Digite o nome' />
                                </div>
                                <div className='inputArea'>
                                    <label>Tipo de usuário:</label>
                                    <select value={userType} onChange={(e) => setUserType(e.target.value)} className='input' name="userType" id="">
                                        <option value='1'>Geral</option>
                                        <option value='2'>Administrador</option>
                                        <option value='3'>Root</option>
                                    </select>
                                </div>
                                <button className='buttonLogin' onClick={() => alterarDados()} type='submit'>Alterar dados</button>
                            </form> 
                            : null
                        }     
                        
                    </div>
                )
            }
            {
                steps[currentStep].id === "Step2" && (
                    <div className='container'>
                        {
                            allUsers.map((u) => {
                                return (
                                    <div className='eachUser' key={u.idUser}>
                                        <div>
                                            <label>Nome: </label>
                                            <span>{u.nameUser}</span>
                                        </div>
                                        <hr />
                                        <div>
                                            <label>Email: </label>
                                            <span>{u.email}</span>
                                        </div>
                                        <hr />
                                        <div>
                                            <label>Tipo de usuário: </label>
                                            <span>{u.idType}</span>
                                        </div>
                                        <hr />
                                        <div>
                                            <label>Status: </label>
                                            {u.idStatus === 1 ? <span className='ativo'>Ativo</span> : <span className='inativo'>Inativo</span>}
                                        </div>
                                        <hr />
                                        <div>
                                            <label>Senha:</label>
                                            <span>{u.passwd}</span>
                                        </div>
                                        {
                                            parseJwt().role === '3' ? <div className='functionsArea'>
                                                <div className='alterStatus' onClick={(event) => alterStatus(u.idUser)}>
                                                    <TbExchange.TbExchange />
                                                </div>
                                                <div className='deleteUser' onClick={(event) => deleteUser(u.idUser)}><IoIcons.IoTrashOutline /></div>
                                            </div> :
                                                <div className='functionsArea'>
                                                    <div className='alterStatus' onClick={(event) => alterStatus(u.idUser)}>
                                                        <TbExchange.TbExchange />
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}
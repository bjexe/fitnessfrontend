import React from 'react'
import './LandingPage.css'
import register from '../services/register'
import login from '../services/login'
import comms from '../services/comms'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export default function LandingPage(){

    // state that holds information about the user when logged in
    const [user, setUser] = React.useState({
        token: null,
        username: null,
        name: null
    })

    // states for registering and logging in
    const [loginStatus, setLoginStatus] = React.useState(null)
    const [registerStatus, setRegisterStatus] = React.useState(null)

    const [loginFormData, setLoginFormData] = React.useState({
        username: "",
        password: ""
    })

    const [registerFormData, setRegisterFormData] = React.useState(
        {
            username: "",
            password: "",
            email: "",
            emailNotifs: false
        }
    )

    let navigate = useNavigate()
    let auth = useAuth()
    
    // get user stored in local memory
    // React.useEffect(() => {
    //     const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    //     const loggedInUser = JSON.parse(loggedInUserJSON)
    //     setUser(loggedInUser)
    //     comms.setToken(user.token)
    // }, [])

    function handleRegisterChange(event){
        const {name, value, type, checked} = event.target
        setRegisterFormData((prevData) => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value 
            }
        })
    }

    function handleLoginChange(event) {
        const {name, value} = event.target
        setLoginFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    async function handleRegisterSubmit(event){
        event.preventDefault()
        try {
            const res = await register(registerFormData)
            setRegisterStatus(true)
        } catch(exception) {
            console.log(JSON.stringify(exception, null, 2))
            setRegisterStatus(false)
        }
    }

    async function handleLoginSubmit(event) {
        event.preventDefault()
        try {
            await auth.signin(loginFormData)
            //window.localStorage.setItem('loggedInUser', JSON.stringify(res))
            setLoginStatus(true)
            setTimeout(() => {
                navigate("/home")
            }, 1500)
        } catch (exception) {
            setLoginStatus(false)
            console.log(JSON.stringify(exception, null, 2))
        }
        
    }

    return (
        <div className='landing-page'>
            <div className="content">
                <h1 className='header'>
                    Welcome to Yacked!  Please create an account below.
                </h1>
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Sign up</h1>
                    <label>
                        Username:
                        <input type="text" value={registerFormData.username} onChange={handleRegisterChange} name="username"/>
                    </label>
                    <label>
                        Email: 
                        <input type="email" value={registerFormData.email} onChange={handleRegisterChange} name="email"/>
                    </label>
                    <label>
                        Password: 
                        <input type="password" value={registerFormData.password} onChange={handleRegisterChange} name="password"/>
                    </label>
                    <input type="checkbox" id="emailNotifs" checked={registerFormData.emailNotifs} onChange={handleRegisterChange} name="emailNotifs"/>
                    <label htmlFor='emailNotifs'>Sign up for email notifications</label>
                    <button className='submit-btn'>Sign up</button>
                    {registerStatus === false && <p style={{color: 'red'}}>Error registering. Username may be taken.</p>}
                    {registerStatus === true && <p style={{color: 'green'}}>Successfully signed up!</p>}
                </form>
                <form onSubmit={handleLoginSubmit}>
                    <h1>Log in</h1>
                    <label>
                        Username:
                        <input type="text" value={loginFormData.username} onChange={handleLoginChange} name="username"/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={loginFormData.password} onChange={handleLoginChange} name="password"/>
                    </label>
                    <button className='submit-btn'>Log in</button>
                    {loginStatus === false && <p style={{color: 'red'}}>Invalid credentials</p>}
                    {loginStatus === true && <p style={{color: 'green'}}>Successfully logged in! Redirecting to homepage...</p>}
                </form>
            </div>
        </div>
    )
}
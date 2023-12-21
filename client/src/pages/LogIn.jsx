import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AxiosInstance from '../helpers/AxiosInstance'
import '../styles/Signup.css'


function LogIn() {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }


    async function login(event) {
        event.preventDefault();

        try {
            const response = AxiosInstance.post("/user/login", data)
            await toast.promise(response, {
                loading: "Wait! Loging your account",
                success: (data) => {
                    setData({
                        email: "",
                        password: ""
                    })
                    navigate('/')
                    return data?.data?.message;
                },
                error: (error) => {
                    return error?.response?.data?.message
                },
            });
        } catch (error) {
            console.error(error.message)
        }
    }


    return (
        <div className='signup_container'>
            <div className='left_container'>
                <form onSubmit={login} className='signup_form'>
                    <h1>Already have an account ?</h1>
                    <p>Your personal job finder is here</p>
                    <div className='inputs'>
                        <input type="email" name="email" id="email" placeholder='Email' onChange={handleUserInput} value={data.email} />
                        <input type="password" name="password" id="password" placeholder='Password' onChange={handleUserInput} value={data.password} />
                    </div>
                    <button type="submit" className='signin'>Sign in</button>
                    <p>Don’t have an account? <Link to={'/signup'}>Sign up</Link>  </p>
                </form>
            </div>
            <div className='right_container'>
                <div className='image'>
                    <p>Your Personal Job Finder</p>
                </div>
            </div>
        </div>
    )
}

export default LogIn

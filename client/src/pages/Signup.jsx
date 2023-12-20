import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import AxiosInstance from '../helpers/AxiosInstance'
import '../styles/Signup.css'

function Signup() {
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""
    })
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate()

    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    function handleCheckbox(e) {
        setIsChecked(e.target.checked)
    }
    async function createAccount(event) {
        event.preventDefault();
        if (!isChecked) {
            toast.error('Please agree to terms of use and privacy policy');
            return;
        }
        const response = AxiosInstance.post("/user/signup", data)
        await toast.promise(response, {
            loading: "Wait! Creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        setData({
            name: "",
            email: "",
            mobile: "",
            password: ""
        })
        navigate('/')
    }


    return (
        <div className='signup_container'>
            <div className='left_container'>
                <form onSubmit={createAccount} className='signup_form'>
                    <h1>Create an account</h1>
                    <p>Your personal job finder is here</p>
                    <div className='inputs'>
                        <input type="text" name='name' id='name' placeholder='Name' onChange={handleUserInput} value={data.name} />
                        <input type="email" name="email" id="email" placeholder='Email' onChange={handleUserInput} value={data.email} />
                        <input type="tel" name="mobile" id="mobile" placeholder='Mobile' onChange={handleUserInput} value={data.mobile} />
                        <input type="password" name="password" id="password" placeholder='Password' onChange={handleUserInput} value={data.password} />
                    </div>
                    <div className='privacy'>
                        <input type="checkbox" name="checkbox" id="checkbox" onChange={handleCheckbox} />
                        <p>By creating an account, I agree to our terms of use and privacy policy</p>
                    </div>
                    <button type="submit">Create Account</button>
                    <p>Already have an acount ? <Link to={'/login'}>Sign in</Link>  </p>
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

export default Signup

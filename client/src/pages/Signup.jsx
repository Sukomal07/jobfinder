import { Link } from 'react-router-dom'
import '../styles/Signup.css'

function Signup() {
    return (
        <div className='signup_container'>
            <div className='left_container'>
                <form className='signup_form'>
                    <h1>Create an account</h1>
                    <p>Your personal job finder is here</p>
                    <div className='inputs'>
                        <input type="text" name='name' id='name' placeholder='Name' />
                        <input type="email" name="email" id="email" placeholder='Email' />
                        <input type="tel" name="mobile" id="mobile" placeholder='Mobile' />
                        <input type="password" name="password" id="password" placeholder='Password' />
                    </div>
                    <div className='privacy'>
                        <input type="checkbox" name="checkbox" id="checkbox" />
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

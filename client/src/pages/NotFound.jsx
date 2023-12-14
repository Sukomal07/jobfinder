import { Link } from 'react-router-dom'
import '../styles/NotFound.css'
import notfoundImg from '../assets/notfoundImg.jpg'

function NotFound() {
    return (
        <div className='notfound_container'>
            <div className='image_container'>
                <img src={notfoundImg} alt="photo" />
            </div>
            <Link to={'/'} className='back'>
                Go back
            </Link>
        </div>
    )
}

export default NotFound

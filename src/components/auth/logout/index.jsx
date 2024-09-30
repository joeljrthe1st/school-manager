import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import LogoutIcon from '@mui/icons-material/Logout';
import './index.css'
const Logout = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav >
            {
                userLoggedIn
                    ?
                    <>
                     <div className="flex justify-center">
                     <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='logoutbutton'>
                      
                        Logout
                    </button>
                </div>

                    </>
                    :
                    <>
                        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                    </>
            }

        </nav>
    )
}

export default Logout
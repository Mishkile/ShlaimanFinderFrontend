import React from 'react'
import '../../public/styles/Profile.css'
import { useSelector } from 'react-redux'
export default function Profile() {
    const userData = useSelector(state => state.userData)
    return (
        <div>
            <div className='profile-container'>

                <h1>Profile Page</h1>
                <p>Welcome!</p>
                <img width={"100px"} src={'https://shlaiman.online/profile_pics/cd6a4ecde089e295.jpg'} /> <br />
                <label htmlFor="username">Username</label> <br />
                <input type="text" name='username' defaultValue={userData.username} /> <br />

                <label htmlFor="email">Email</label> <br />
                <input defaultValue={userData.email} type="text" name='email' />

                <p>Update Profile Picture</p>
                <input type="file" /> <br />

                <label htmlFor="textArea">Note</label> <br /> <textarea name="textArea" id=""></textarea> <br />
                <button>Update</button>

            </div>
        </div>
    )
}

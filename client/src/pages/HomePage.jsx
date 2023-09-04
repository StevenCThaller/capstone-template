import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const HomePage = () => {
    const {setUser, user} = useContext(UserContext)
    
  return (
    <>
    <div>
        <h1>HomePage</h1>
        <h1>User: {user}</h1>
    </div>
    </>
  )
}

export default HomePage
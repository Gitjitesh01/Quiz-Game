import React, { useState } from 'react'
import Sidebar from '../component/Dashboard/Sidebar'
import MainBoard from '../component/Dashboard/MainBoard';

function Admin() {
    const [logout, setLogout] = useState(false)
    const [userName, setUserName] = useState("")
  return (
    <div className='flex h-screen overflow-hidden'>
        <Sidebar userType="admin" logout={logout}/>
        <MainBoard userType="admin" userName="Admin" />
    </div>
  )
}

export default Admin
import React, { createContext, useContext, useState, useEffect , useMemo } from 'react';
import {jwtDecode} from 'jwt-decode'; // Default import for jwt-decode
import Cookies from 'js-cookie'; // Import for js-cookie

// Create a User Context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(Cookies.get('XgdRTKJvdjhFGFDGD'));
  console.log(currentUser)
  const [currentuserdata, setCurrentUserData] = useState(null);

  useEffect(() => {
   
      // try {
       if(currentUser){
        const decodedUser = jwtDecode(currentUser);
        console.log(decodedUser)
        setCurrentUserData(decodedUser);
        Cookies.set('XgdRTKJvdjhFGFDGD', currentUser, { secure: true });
       }
      // } catch (error) {
      //   console.error('Invalid token:', error);
      //   setCurrentUser(null);
      //   setCurrentUserData(null);
      //   Cookies.remove('XgdRTKJvdjhFGFDGD');
      // }

  }, [currentUser]);

  useMemo(()=>{
    if(currentUser){
      const decodedUser = jwtDecode(currentUser); // Decode the token
    console.log(decodedUser)
    setCurrentUserData(decodedUser);
    console.log(decodedUser?.profilePic)
    
      if(decodedUser?.profilePic){
        localStorage.setItem('userpic', decodedUser.profilePic);
      }
    
    Cookies.set('XgdRTKJvdjhFGFDGD', currentUser, { secure: true });
    }
  }, [currentUser]);


  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, currentuserdata, setCurrentUserData }}>
      {children}
    </UserContext.Provider>
  );
};


// Custom hook for easy access to the context
export const useUser = () => {
  return useContext(UserContext);
};

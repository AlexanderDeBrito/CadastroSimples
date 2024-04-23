import React from 'react';
import Routering from './Routes'
import UserServices from '../Service/UserService'

const userService = new UserServices();

const ProtectedRoutes = ({children}) => {
  const usuarioAutenticado = userService.usuarioAutenticado()
  //TODO  
  return usuarioAutenticado ? children : <Routering/>
}
 
export default ProtectedRoutes;
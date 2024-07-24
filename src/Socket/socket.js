import { io } from 'socket.io-client'
// import { addDeleteGetLocalStorage } from '../Axios/addDeleteGetLocalStorage'
import { baseURL_socket_devlopment, storageKeys } from '../Axios/Enum'

// let token = addDeleteGetLocalStorage(storageKeys.ADMIN_TOKEN, {}, 'get', 'single')
let socket

const initializeSocket = async () => {
  if (!socket) {
    socket = io(baseURL_socket_devlopment, {
      // withCredentials: true,
    })
  }
}

const getSocket = () => socket


const disconnectSocket = () => {
  socket.disconnect()
  socket = null
}

export { getSocket, initializeSocket, disconnectSocket }

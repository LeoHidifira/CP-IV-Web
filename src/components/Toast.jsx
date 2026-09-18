import { FaCheckCircle } from 'react-icons/fa'
import './Toast.css'

function Toast({ message }) {
  if (!message) {
    return null
  }

  return (
    <div className="toast">
      <FaCheckCircle />
      <span>{message}</span>
    </div>
  )
}

export default Toast

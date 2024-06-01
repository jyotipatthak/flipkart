import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Toast = {
  success: (message) => toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000
  }),
  info: (message) => toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000
  }),
  error: (message) => toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000
  }),
};

export default Toast;

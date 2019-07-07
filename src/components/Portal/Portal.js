import ReactDOM from 'react-dom'

const Portal = ({ children }) =>
  ReactDOM.createPortal(children, document.getElementById('overlay'))

export default Portal

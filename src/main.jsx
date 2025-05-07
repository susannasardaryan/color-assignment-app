import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import './index.css'
import App from './App.jsx'
import '@ant-design/v5-patch-for-react-19';
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)

//引入axios
import axios from 'axios'
//设置baseURL
axios.defaults.baseURL="http://localhost:8082"
//设置超时时间
axios.defaults.timeout=3000
axios.interceptors.request.use(
config =>{
const token = sessionStorage.getItem('token')
//alert(token)
if (token) {
//后台给登录用户设置的token的键时什么，headers['''']里的键也应该保持一致
config.headers['token'] = `${token}`
}
return config
},
error =>{
return Promise.reject(error)
}
)
export default axios
import axios from 'utils/axios'
export const login = ({ account, password }) => {
  const data = {
    account,
    password
  }
  return axios.get('/user/loginUser', {
    params:data
  })
}

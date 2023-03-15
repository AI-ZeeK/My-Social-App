import axios from 'axios'

const API =  axios.create({ baseURL: `https://my-social-app-gqkj.onrender.com` });


export const registerPostApi = async (formData: any) => {
    
    const {data} =  await API.post('/auth/register', formData)
    
    return data
}
export const loginPostApi = async (formData: any) => {

     const {data} =  await API.post('/auth/login', formData)

 return data

}
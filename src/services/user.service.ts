import { api, IPagination } from '../helpers'
import { IAddUserRequest, IUserUpdatebyAdminRequest, IUser } from '../store/users/types'


// const login = (email: string, password: string) => {
//     console.log("Nhận chưa")
//     const requestOptions = { 
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//     }
    
//     return fetch(`${env.API_URL}/api/v1/auth`, requestOptions)
//     .then(handleResponse)
//     .then((response) => {
//         sessionStorage.setItem('user', JSON.stringify(response))
//         return response
//     }).catch((error) => {console.log("error là:",error); })
// }

const logout = () => {
    sessionStorage.removeItem('user')
}

// const handleResponse = (response: any) => { 
//     console.log("hshshshs")
//     return response.text().then((text: string) => {
//         const data = text && JSON.parse(text)
//         if (!response.ok) {
//             if(response.status === 401) {
//                 logout();
//             }
//         const error = (data && data.message) || response.statusText
//         return Promise.reject(error)
//     }
//         return data;
//     })
// }


const login = async (email: string, matKhau: string) => {
    const body = {email, matKhau}
    console.log(body)
    return await api.post('/v1/auth', body).then((response) => { 
        console.log(response)
        return response.data
    })
}

const getCurrentLoginUser = async (): Promise<any> => { 
    return await api.get<any>('/v1/auth').then((response) => {
        return response.data
    })
}

const getRole = async (): Promise<any> => { 
    return await api.get<any>('/role').then((response) => {
        return response.data
    })
}

const getUsersPaging = async (
    keyword: string, currentPage: number,
): Promise<IPagination<IUser>> => {
    const res = await api 
    .get<IPagination<IUser>>(`/v1/users/paging/${currentPage}?keyword=${keyword}`).then((response) => { 
        return response.data
    })
    return res
}

const getUsersPagingByRole = async (
    keyword: number, currentPage: number,
): Promise<IPagination<IUser>> => {
    const res = await api 
    .get<IPagination<IUser>>(`/v1/users/role/paging/${currentPage}?keyword=${keyword}`).then((response) => { 
        return response.data
    })
    return res
}

const addUser = async ( user: IUserUpdatebyAdminRequest): Promise<any> => { 
    const res = await api.post(`/v1/users/addUser`, user).then((response) => { 
        return response.data
    })
    return res;
}

const updateUser = async ( id: string, user: IUserUpdatebyAdminRequest): Promise<any> => { 
    const res = await api.put(`/v1/users/${id}`, user).then((response) =>{
        return response.data
    })
    return res
}

const getUserById = async ( id: string ): Promise<IUser> => { 
    const res = await api.get<IUser>(`/v1/users/${id}`).then((response) => {
        return response.data
    })
    return res
}

const deleteUser = async (ids: number[]): Promise<any> => { 
    const res = await api.delete(`/v1/users`, { data:  ids  }).then((response) => {
            return response.data
        })
    return res;
}

export const userService = {
    login,
    logout,
    getCurrentLoginUser,
    getUsersPaging,
    getUsersPagingByRole,
    getRole,
    addUser,
    updateUser,
    getUserById,
    deleteUser
}
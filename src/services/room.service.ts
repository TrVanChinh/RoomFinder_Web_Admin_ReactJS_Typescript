import { api, IPagination } from '../helpers'
import { RoomInfo } from '../store/rooms/types'

// const getRoomType = async (): Promise<any> => { 
//     return await api.get<any>('/role').then((response) => {
//         return response.data
//     })
// }

const getRoomsPaging = async (
    keyword: string, currentPage: number,
): Promise<IPagination<RoomInfo>> => {
    const res = await api 
    .get<IPagination<RoomInfo>>(`/room/paging/${currentPage}?keyword=${keyword}`).then((response) => { 
        return response.data
    })
    return res
}

const getRoomsPagingByType = async (
    keyword: number, currentPage: number,
): Promise<IPagination<RoomInfo>> => {
    const res = await api 
    .get<IPagination<RoomInfo>>(`/room/type/paging/${currentPage}?keyword=${keyword}`).then((response) => { 
        return response.data
    })
    return res
}

export const roomService = {
    getRoomsPaging,
    getRoomsPagingByType,

}
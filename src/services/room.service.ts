import { api, IPagination } from '../helpers'
import { ReportRoomInfo, RoomInfo } from '../store/rooms/types'

const getRoomType = async (): Promise<any> => { 
    return await api.get<any>('/room/type').then((response) => {
        return response.data
    })
}

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
    roomTypeId: number | null, roomStatus: string | null, currentPage: number
  ): Promise<IPagination<RoomInfo>> => {
    const res = await api
      .post<IPagination<RoomInfo>>(`/room/type/paging/${currentPage}`, {
        maLoaiPhong: roomTypeId, 
        trangThaiPhong: roomStatus, 
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };
  

const getRoomById = async ( id: string ): Promise<RoomInfo> => { 
    const res = await api.get<RoomInfo>(`/room/${id}`).then((response) => {
        return response.data
    })
    return res
}

const getReportRoomsPaging = async (
    currentPage: number
  ): Promise<IPagination<ReportRoomInfo>> => {
    const res = await api
      .get<IPagination<ReportRoomInfo>>(`/room/reportroom/${currentPage}`)
      .then((response) => {
        return response.data;
      });
    return res;
  };
  


const updateStatus = async ( id: string, roomStatus: string ): Promise<RoomInfo> => { 
    const res = await api.put<RoomInfo>(`/room/updateStatus/${id}`, { trangThaiPhong: roomStatus }).then((response) => {
        return response.data
    })
    return res
}

const approveRoom = async (id: string) => {
    const res = await api.put<RoomInfo>(`/room/approveRoom/${id}`).then((response) => {
        return response.data
    })
    return res
}

const rejectRoom = async (id: string, reason: string) => {
    const res = await api.put<RoomInfo>(`/room/rejectRoom/${id}`, {
        lyDo: reason
    }).then((response) => {
        return response.data
    })
    return res
}

const deleteRoom = async (ids: string[]): Promise<any[]> => {
  if (ids.length === 0) {
    throw new Error("No IDs provided");
  }

  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        const response = await api.put(`/room/updateStatus/${id}`, { trangThaiPhong: "Ẩn" });
        return { id, status: "success", data: response.data };
      } catch (error) {
        return { id, status: "error", error };
      }
    })
  );

  return results; // Trả về danh sách kết quả
};


export const roomService = {
    getRoomType,
    getRoomsPaging,
    getRoomsPagingByType,
    getRoomById,
    getReportRoomsPaging,
    updateStatus,
    approveRoom,
    rejectRoom,
    deleteRoom
}
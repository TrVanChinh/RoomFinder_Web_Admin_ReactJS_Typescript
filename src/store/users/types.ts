import { IPagination} from '../../helpers/pagination'

// export interface IUser {
//     _id: string,
//     first_name: string,
//     last_name: string,
//     email: string,
//     avatar: string
// }

export interface IUser {
    maNguoiDung: number;
    tenNguoiDung: string;
    gioiTinh: string | null;
    queQuan: string | null;
    email: string;
    matKhau: string;
    sdt: string | null;
    diaChi: string | null;
    hinhDaiDien: string | null;
    ngaySinh: Date | null;
    soCCCD: string | null;
    maPX: number | null;
    maLTK: number | null;
    trangThaiTaiKhoan: string | null;
    trangThaiDangKy: string | null;
    ngayDangKy: Date;
    ngayCapNhat: Date | null;
}

export interface IAddUserRequest {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export interface UsersState {
    items: IUser[],
    pageSize: number,
    page: number,
    total: number,
    loading: boolean,
    deteledCount: number,
    error: string | null,
    editUser: IUser | null,
}

export interface IUserUpdatebyAdminRequest { 
    tenNguoiDung: string,
    email: string,
    matKhau: string,
    maLTK: number,
    ngaySinh: string | null,
    sdt: string | null,
    gioiTinh: string | null,
    soCCCD: string | null,
    trangThaiTaiKhoan: string,
    trangThaiDangKy: string | null,
 
}

// IUpdateUserRequest
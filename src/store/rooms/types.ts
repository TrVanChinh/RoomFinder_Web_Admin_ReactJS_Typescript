import { IUser } from "../users/types";

export  interface IRoomType {
    maLoaiPhong: number;
    loaiPhong: string;
    phiDichVu: number;
}

export  interface IAddress {
    maDiaChi: number;
    soNha: string;
    phuongXa: string;
    quanHuyen: string;
    tinhThanh: string;
    kinhDo: number | null;
    viDo: number | null;
}


export  interface IRoom {
    maPhong: number;
    maNguoiDung: number;
    maLoaiPhong: number;
    maDiaChi: number;
    maNoiThat: number;
    tieuDe: string ;
    moTa: string;
    giaPhong: number;
    giaDien: number;
    giaNuoc: number;
    dienTich: string;
    phongChungChu: boolean;
    gacXep: boolean;
    nhaBep: boolean;
    soLuongPhongNgu: number;
    soTang: number;
    soNguoiToiDa: number;
    trangThaiPhong: string;
}

export interface MediaFormat {
  maHinhAnh: number;
  danhMucHinhAnh: string;
  loaiTep: string;
  duongDan: string;
}

export  interface IDeposit {
    maPhiDatCoc: number;
    maPhong: number;
    phiDatCoc: number;
    thoiHanDatCoc: number;
    donViThoiGian: string;
}

export interface IInterior {
    maNoiThat: number;
    dieuHoa: boolean;
    wifi: boolean;
    nongLanh: boolean;
    giuong: boolean;
    banGhe: boolean;
    sofa: boolean;
    chanGaGoi: boolean;
    tuLanh: boolean;
    doDungBep: boolean;
    tuQuanAo: boolean;
}


export interface RoomInfo {
    maPhong: number;
    nguoiDung: IUser | null;
    loaiPhong: IRoomType;
    diaChi: IAddress;
    noiThat: IInterior;
    tieuDe: string ;
    chiPhiDatCoc: IDeposit[];
    hinhAnh: MediaFormat[];
    moTa: string;
    giaPhong: number;
    giaDien: number;
    giaNuoc: number;
    dienTich: string;
    phongChungChu: boolean;
    gacXep: boolean;
    nhaBep: boolean;
    soLuongPhongNgu: number;
    soTang: number;
    soNguoiToiDa: number;
    trangThaiPhong: string;
}
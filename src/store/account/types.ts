export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOG_OUT = 'LOG_OUT';
export const LOAD_CURRENT_LOGIN_USER_REQUEST = 'LOAD_CURRENT_LOGIN_USER_REQUEST'
export const LOAD_CURRENT_LOGIN_USER_SUCCESS = 'LOAD_CURRENT_LOGIN_USER_SUCCESS'
export const LOAD_CURRENT_LOGIN_USER_FAILURE = 'LOAD_CURRENT_LOGIN_USER_FAILURE'

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

// export interface AuthenticatedUser {
//     _id: string;
//     first_name: string;
//     last_name: string;
//     email: string;
//     avatar: string;
// }

export interface AuthenticatedUser {
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
    trangThaiDangKy: boolean | null;
    ngayDangKy: Date;
    ngayCapNhat: Date | null;
}

interface LoginRequest {
    type: typeof LOGIN_REQUEST;
    payload: {
        email: string;
        password: string;
    };
    
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: {
        token: string;
    };

}

interface LoginFailure {
    type: typeof LOGIN_FAILURE;
    payload: {
        error: string;
    };

}

interface Logout {
    type: typeof LOG_OUT;

}

interface LoadCurrentLoginUserRequest {
    type: typeof LOAD_CURRENT_LOGIN_USER_REQUEST;
}

interface LoadCurrentLoginUserSuccess {
    type: typeof LOAD_CURRENT_LOGIN_USER_SUCCESS;
    payload: AuthenticatedUser;
}

interface LoadCurrentLoginUserFailure {
    type: typeof LOAD_CURRENT_LOGIN_USER_FAILURE;
    payload: {
        error: string;
    };
}

export interface AccountState {
    user: AuthenticatedUser | null;
    loading: boolean;
    error: string | null;
    token: string | null;
    refreshToken: string | null,
}

interface RefreshTokenRequest {
    type: typeof REFRESH_TOKEN_REQUEST;
  }
  
  interface RefreshTokenSuccess {
    type: typeof REFRESH_TOKEN_SUCCESS;
    payload: {
      token: string;
      refreshToken: string;
    };
  }
  
  interface RefreshTokenFailure {
    type: typeof REFRESH_TOKEN_FAILURE;
    payload: {
      error: string;
    };
  }

export type AccountActionTypes = 
    | LoginRequest 
    | LoginSuccess 
    | LoginFailure 
    | Logout
    | LoadCurrentLoginUserRequest 
    | LoadCurrentLoginUserSuccess 
    | LoadCurrentLoginUserFailure
    | RefreshTokenRequest
    | RefreshTokenSuccess
    | RefreshTokenFailure;
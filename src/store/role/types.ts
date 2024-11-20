export interface IRole {
    maLTK: string,
    vaiTro: string,
}

export interface RoleState {
    items: IRole[],
    loading: boolean,
    error: string | null,
}
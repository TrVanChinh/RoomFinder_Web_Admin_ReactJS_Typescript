
import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { IRole } from '../../../store/role/types';
import { addUser, getUserById, updateUser } from '../../../store/users/thunks';
import { validateEmail } from '../../../helpers';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import { UrlConstants } from '../../../constans';
import { IUserUpdatebyAdminRequest } from '../../../store/users/types';

const AddUser = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: AppState) => state.users.editUser);
  const roles: IRole[] = useSelector((state: AppState) => state.role.items);
  const loading = useSelector((state: AppState) => state.users.loading);

  const [formInputs, setFormInputs] = useState({
    email: '',
    tenNguoiDung: '',
    matKhau: '',
    gioiTinh: '',
    ngaySinh: '',
    soCCCD: '',
    sdt: '',
    trangThaiTaiKhoan: '',
    trangThaiDangKy: '',
    maLTK: 0,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { email, tenNguoiDung, matKhau, gioiTinh, ngaySinh, soCCCD, sdt, trangThaiTaiKhoan, trangThaiDangKy, maLTK } = formInputs;

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (field: string, value: string | number) => {
    setFormInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormInputs((prev) => ({ ...prev, ngaySinh: date ? date.toISOString().split('T')[0] : '' }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (email && matKhau && maLTK && trangThaiTaiKhoan) {
      const user: IUserUpdatebyAdminRequest = {
        email: email,
        tenNguoiDung: tenNguoiDung,
        matKhau: matKhau,
        gioiTinh: gioiTinh,
        ngaySinh: ngaySinh,
        soCCCD: soCCCD,
        sdt: sdt,
        trangThaiTaiKhoan: trangThaiTaiKhoan,
        trangThaiDangKy: trangThaiDangKy,
        maLTK: maLTK,
      };
      const resultAction = await dispatch(addUser(user));

      if (addUser.fulfilled.match(resultAction)) {
        // Nếu addUser thành công
        navigate('/user');
      } else if (addUser.rejected.match(resultAction)) {
        // Nếu addUser thất bại
        console.error('Failed to add user:', resultAction.payload);
        // resultAction.payload chứa lỗi từ rejectWithValue
      }
    }
  };

  return (
    <Fragment>
      <h1 className="h3 mb-4 text-gray-800">Thêm mới user</h1>
      <div className="card">
        <div className="card-header">Thông tin user</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && (!email || !validateEmail(email))
                    ? 'is-invalid'
                    : '')
                }
                name='email'
                placeholder='name@example.com'
                onChange={handleChange}
              />
              {formSubmitted && !email && <div className="invalid-feedback">Email is required</div>}
              {formSubmitted && !validateEmail(email) && <div className="invalid-feedback">Email is not valid</div>}
            </div>

            <div className="form-group">
              <label>Họ tên</label>
              <input
                type="text"
                className="form-control"
                name="tenNguoiDung"
                value={tenNguoiDung}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="text"
                className="form-control"
                name="matKhau"
                value={matKhau}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                name="sdt"
                value={sdt}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Số căn cước công dân</label>
              <input
                type="text"
                className="form-control"
                name="soCCCD"
                value={soCCCD}
                onChange={handleChange}
              />
            </div>
            <div className='row ml-1'>
              <div className="form-group">
                <label>Ngày sinh</label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={formInputs.ngaySinh ? new Date(formInputs.ngaySinh) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>

              </div>

              <div className="form-group ml-4" >
                <label>Giới tính</label>
                <div>
                <select
                  className="btn dropdown-toggle border "
                  name="gioiTinh"
                  value={gioiTinh}
                  onChange={(e) => handleDropdownChange('gioiTinh', e.target.value)}
                >
                  <option value="">Chọn</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                </div>
              </div>

              <div className="form-group ml-4 ">
                <label>Vai trò</label>
                <div>
                <select
                  className="btn dropdown-toggle border"
                  name="maLTK"
                  value={maLTK}
                  onChange={(e) => handleDropdownChange('maLTK', Number(e.target.value))}
                >
                  <option value={0}>Chọn vai trò</option>
                  {roles.map((role) => (
                    <option key={role.maLTK} value={role.maLTK}>
                      {role.vaiTro}
                    </option>
                  ))}
                </select>
                </div>
                
              </div>
              <div className="form-group ml-4" >
                <label>Trạng thái tài khoản</label>
                <div>
                <select
                  className="btn dropdown-toggle border "
                  name="trangThaiTaiKhoan"
                  value={trangThaiTaiKhoan}
                  onChange={(e) => handleDropdownChange('trangThaiTaiKhoan', e.target.value)}
                >
                  <option value="">Chọn</option>
                  <option value="Đang hoạt động">Đang hoạt động</option>
                  <option value="Tài khoản vi phạm">Tài khoản vi phạm</option>
                  <option value="Tài khoản bị khóa">Tài khoản bị khóa</option>
                </select>
                </div>
              </div>
            </div>


            


            <button className="btn btn-primary mr-3" type="submit" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Lưu
            </button>
            <Link className="btn btn-danger" to={UrlConstants.USERS_LIST}>
              Hủy
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddUser;

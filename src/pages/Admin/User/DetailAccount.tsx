
import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { IRole } from '../../../store/role/types';
import { getUserById, updateUser } from '../../../store/users/thunks';
import { validateEmail } from '../../../helpers';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import { UrlConstants } from '../../../constans';
import moment from 'moment';

const DetailAccount = () => {
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

  useEffect(() => {
    if (user) {
      const formattedNgaySinh = user.ngaySinh ? new Date(user.ngaySinh).toISOString().split('T')[0] : ""; // Convert to string (YYYY-MM-DD)
      setFormInputs({
        tenNguoiDung: user.tenNguoiDung || '',
        email: user.email || '',
        matKhau: user.matKhau || '',
        gioiTinh: user.gioiTinh || '',
        ngaySinh: formattedNgaySinh,
        soCCCD: user.soCCCD || '',
        sdt: user.sdt || '',
        trangThaiTaiKhoan: user.trangThaiTaiKhoan || '',
        trangThaiDangKy: user.trangThaiDangKy || '',
        maLTK: user.maLTK || 0,
      });
    }
  }, [user]);

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

    if (id) {
      const resultAction = await dispatch(updateUser({ id, user: formInputs }));

      if (updateUser.fulfilled.match(resultAction)) {
        navigate(UrlConstants.USERS_LIST);
      } else {
        console.error('Failed to update user:', resultAction.payload);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="h3 mb-4 text-gray-800">Thông tin đăng ký</h1>
      <div className="card">
        <div className="card-header">Thông tin user</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <text
                className={
                  'form-control ' +
                  (formSubmitted && (!email || !validateEmail(email))
                    ? 'is-invalid'
                    : '')
                }

              >
                {email}
              </text>
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



            {/* <div className='row ml-1'>
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
            </div> */}

            {/* Hình căn cước */}
            <div className='row ml-1'> 
                <div className="form-group">
                    <label>Hình mặt trước căn cước</label>
                    <div>
                        <img
                            src="https://img.pikbest.com/templates/20240623/happy-new-year-2025-2c-at-ty_10634366.jpg!w700wp"
                            // alt={`Avatar of ${user.tenNguoiDung}`}
                            alt=""
                            style={{ width: '300px', height: '300px' }}
                        />
                    </div>
              </div>

              <div className="form-group ml-4">
                    <label>Hình mặt sau căn cước</label>
                    <div>
                        <img
                            src="https://img.pikbest.com/templates/20240623/happy-new-year-2025-2c-at-ty_10634366.jpg!w700wp"
                            // alt={`Avatar of ${user.tenNguoiDung}`}
                            alt=""
                            style={{ width: '300px', height: '300px' }}
                        />
                    </div>
              </div>
            </div>
            


            <button className="btn btn-primary mr-3" type="submit" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Duyệt
            </button>
            <Link className="btn btn-danger" to={UrlConstants.USERS_LIST}>
              Từ chối
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailAccount;
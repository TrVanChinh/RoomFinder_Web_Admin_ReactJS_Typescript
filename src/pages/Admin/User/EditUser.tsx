// import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, AppState } from '../../../store';
// import { IAddUserRequest, IUserUpdatebyAdminRequest } from '../../../store/users/types';
// import { Link, useParams } from 'react-router-dom';
// import { UrlConstants } from '../../../constans/index';
// import { addUser, getUserById, updateUser } from '../../../store/users/thunks';
// import { validateEmail } from '../../../helpers';
// import { useNavigate } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.module.css"
// import { IRole } from '../../../store/role/types';

// const EditUser = () => {
//   let { id } = useParams<{ id: string }>();
//   const user = useSelector((state: AppState) => state.users.editUser);
//   const role: IRole[] = useSelector((state: AppState) => state.role.items)

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const loading = useSelector<AppState>((state) => state.users.loading);

//   const [gioiTinh, setGioiTinh] = useState<String>("");
//   const [ngaySinh, setNgaySinh] = useState<String>("");
//   const [tenNguoiDung, setTenNguoiDung] = useState<String>("")
//   const [sdt, setSdt] = useState<String>("")
//   const [soCCCD, setSocccD] = useState<String>("")
//   const [trangThaiTaiKhoan, setTrangThaiTaiKhoan] = useState<String>("")
//   const [trangThaiDangKy, setTrangThaiDangKy] = useState<String>("")
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedDropDownItems, setSelectedDropDownItems] = useState<string>("")
//   const [dropDownIndexItem, setDropDownIndexItem] = useState<number>(0)

//   const [isOpen, setIsOpen] = useState(false);
//   const [isGenderOpen, setIsGenderOpen] = useState(false);
//   const [isAccountStatusOpen, setIsAccountStatusOpen] = useState(false);
//   const [isRegisterStatusOpen, setIsRegisterStatusOpen] = useState(false);


//   const toggleGenderDropdown = () => {
//     setIsGenderOpen(!isGenderOpen);
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleAccountStatusDropdown = () => {
//     setIsAccountStatusOpen(!isAccountStatusOpen);
//   };

//   const toggleisRegisterStatusOpenDropdown = () => {
//     setIsRegisterStatusOpen(!isRegisterStatusOpen);
//   };



//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };

//   useEffect(() => {
//     if (id) {
//       dispatch(getUserById(id));
//     } else {
//       console.error("ID không tồn tại");
//     };
//   }, [dispatch, id])

//   useEffect(() => {
//     if (user) {
//       setFormInputs({
//         tenNguoiDung: user.tenNguoiDung || '',
//         email: user.email || '',
//         gioiTinh: user.gioiTinh || '',
//         ngaySinh: user.ngaySinh || '',
//         soCCCD: user.soCCCD || '',
//         sdt: user.sdt || '',
//         trangThaiTaiKhoan: user.trangThaiTaiKhoan || '',
//         trangThaiDangKy: user.trangThaiDangKy || '',
//         maLTK: Number(user.maLTK) || 0,
//       });
//     }
//   }, [user]);

//   const [formInputs, setFormInputs] = useState({
//     email: '',
//     tenNguoiDung: '',
//     gioiTinh: '',
//     soCCCD: '',
//     sdt: '',
//     trangThaiTaiKhoan: '',
//     trangThaiDangKy: '',
//     maLTK: 0,
//     ngaySinh: '',
//   });
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   // const { email, tenNguoiDung, gioiTinh, ngaySinh, soCCCD, sdt, trangThaiTaiKhoan, trangThaiDangKy, maLTK } = formInputs;


//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormInputs((inputs) => ({ ...inputs, [name]: value }));
//   };

//   const handleDropdownClick = (maLTK: number, vaiTro: string) => {
//     setSelectedDropDownItems(vaiTro);
//     setDropDownIndexItem(maLTK);
//     toggleDropdown();
//   };

//   const dropdownElements: JSX.Element[] = role.map((item) => (
//     <button
//       key={item.maLTK}
//       className="dropdown-item"
//       onClick={() => {
//         handleDropdownClick(Number(item.maLTK), item.vaiTro);
//       }}
//     >
//       {item.vaiTro}
//     </button>
//   ));

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setFormSubmitted(true);
//     // if (email && first_name && last_name) {
//     //   if (id) {  // Kiểm tra nếu id không phải là undefined
//     //     const user: IUserUpdatebyAdminRequest = {
//     //       email,
//     //       soCCCD,
//     //       // last_name,
//     //     };
//     //     const resultAction = await dispatch(updateUser({ id, user }));

//     //     if (updateUser.fulfilled.match(resultAction)) {
//     //       // Nếu updateUser thành công
//     //       navigate('/user');
//     //     } else if (updateUser.rejected.match(resultAction)) {
//     //       // Nếu updateUser thất bại
//     //       console.error('Failed to update user:', resultAction.payload);
//     //       // resultAction.payload chứa lỗi từ rejectWithValue
//     //     }
//     //   } else {
//     //     console.error('User ID is missing or invalid');
//     //   }
//     // }
//   };


//   return (
//     <Fragment>
//       <h1 className='h3 mb-4 text-gray-800'>Cập nhật user</h1>
//       <div className='card'>
//         <div className='card-header'>Thông tin user</div>
//         <div className='card-body'>

//           <form onSubmit={handleSubmit}>
//             <div className='form-group'>
//               <label>Email</label>
//               <input
//                 type='text'
//                 className={
//                   'form-control ' +
//                   (formSubmitted && (!email || !validateEmail(email))
//                     ? 'is-invalid'
//                     : '')
//                 }
//                 name='email'
//                 value={email}
//                 placeholder='name@example.com'
//                 onChange={handleChange}
//               />
//               <text
//                 className={
//                   'form-control ' +
//                   (formSubmitted && (!email || !validateEmail(email))
//                     ? 'is-invalid'
//                     : '')
//                 }

//               >
//                 {email}
//               </text>
//               {formSubmitted && !email && (
//                 <div className='invalid-feedback'>Email is required</div>
//               )}
//               {formSubmitted && !validateEmail(email) && (
//                 <div className='invalid-feedback'>Email is not valid</div>
//               )}
//             </div>
//             <div className='form-group'>
//               <label>Họ tên</label>
//               <input
//                 type='text'
//                 className={
//                   'form-control ' +
//                   (formSubmitted && !first_name ? 'is-invalid' : '')
//                 }
//                 name='first_name'
//                 value={first_name}
//                 onChange={handleChange}
//               />
//               {formSubmitted && !first_name && (
//                 <div className='invalid-feedback'>First name is required</div>
//               )}
//             </div>

//             <div className='form-group'>
//               <label> Số điện thoại</label>
//               <input
//                 type='text'
//                 className={
//                   'form-control ' +
//                   (formSubmitted && !first_name ? 'is-invalid' : '')
//                 }
//                 name='first_name'
//                 value={first_name}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className='form-group'>
//               <label> Số căn cước công dân</label>
//               <input
//                 type='text'
//                 className={
//                   'form-control ' +
//                   (formSubmitted && !soCCCD ? 'is-invalid' : '')
//                 }
//                 name='soCCCD'
//                 value={soCCCD}
//                 onChange={handleChange}
//               />
//             </div>


//             <div className="row">
//               <div className='form-group ml-3'>
//                 <label> Ngày sinh</label>
//                 <div >
//                   <DatePicker
//                     className={
//                       'form-control ' +
//                       (formSubmitted && (!email || !validateEmail(email))
//                         ? 'is-invalid'
//                         : '')
//                     }
//                     selected={selectedDate}
//                     onChange={handleDateChange}
//                     dateFormat='yyyy-MM-dd'
//                   />
//                 </div>
//               </div>



//               <div className='form-group ml-4'>
//                 <label>Giới tính</label>
//                 <div className="dropdown mb-2">
//                   {gioiTinh === " " ? (
//                     <button
//                       onClick={toggleGenderDropdown}
//                       className="btn btn-primary dropdown-toggle"
//                     >
//                       Chọn
//                     </button>
//                   ) : (
//                     <button
//                       onClick={toggleGenderDropdown}
//                       className="btn btn-primary dropdown-toggle"
//                     >
//                       {gioiTinh}
//                     </button>
//                   )}

//                   {isGenderOpen && (
//                     <div className="dropdown-menu show">
//                       {['Nam', 'Nữ', 'Khác'].map((item, index) => ( 
//                         <button
//                           key={index}
//                           className="dropdown-item"
//                           onClick={() => {
//                             setGioiTinh(item)
//                             toggleGenderDropdown()
//                           }}
//                         >
//                          {item}
//                       </button>
//                       ))}

//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className='form-group ml-4'>
//                 <label>Vai trò</label>
//                 {/* Dropdown */}
//                 <div className="dropdown mb-2">
//                   {selectedDropDownItems === "" ? (
//                     <button
//                       onClick={toggleDropdown}
//                       className="btn btn-primary dropdown-toggle"
//                     >
//                       Loại tài khoản
//                     </button>
//                   ) : (
//                     <button
//                       onClick={toggleDropdown}
//                       className="btn btn-primary dropdown-toggle"
//                     >
//                       {selectedDropDownItems}
//                     </button>
//                   )}

//                   {isOpen && (
//                     <div className="dropdown-menu show">
//                       {dropdownElements}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className='form-group ml-4'>
//                 <label>Trạng thái tài khoản</label>
//                 <div className="dropdown mb-2">
//                   {trangThaiTaiKhoan === "" ? (
//                     <button
//                       onClick={toggleAccountStatusDropdown}
//                       className="btn btn-primary dropdown-toggle"
//                     >
//                       Chọn trạng thái
//                     </button>
//                   ) : (
//                     <button
//                       onClick={toggleAccountStatusDropdown}
//                       className="btn btn-primary dropdown-toggle"
//                     >
//                       {trangThaiTaiKhoan}
//                     </button>
//                   )}

//                   {isAccountStatusOpen && (
//                     <div className="dropdown-menu show">
//                       {['Đang hoạt động', 'Tài Khoản vi phạm', 'Tài Khoản bị khóa'].map((item, index) => (
//                         <button
//                           key={index}
//                           className="dropdown-item"
//                           onClick={() => {
//                             setTrangThaiTaiKhoan(item)
//                             toggleAccountStatusDropdown()
//                             }
//                           }
//                         >
//                           {item}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className='form-group ml-4'>
//                 <label>Trạng thái đăng ký</label>
//                 <div className="dropdown mb-2">
//                   {trangThaiDangKy === "" ? (
//                     <button
//                       onClick={toggleisRegisterStatusOpenDropdown}
//                       className="btn btn-primary dropdown-toggle"
//                     >
//                       Chọn trạng thái
//                     </button>
//                   ) : (
//                     <button
//                       onClick={toggleisRegisterStatusOpenDropdown}
//                       className="btn btn-primary dropdown-toggle"
//                     >
//                       {trangThaiDangKy}
//                     </button>
//                   )}

//                   {isRegisterStatusOpen && (
//                     <div className="dropdown-menu show">
//                       {['Chờ duyệt', 'Duyệt', 'Từ chối'].map((item, index) => (
//                         <button
//                           key={index}
//                           className="dropdown-item"
//                           onClick={() => {
//                             setTrangThaiDangKy(item)
//                             toggleisRegisterStatusOpenDropdown()
//                             }
//                           }
//                         >
//                           {item}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>


//             <div className='form-group'>
//               <button className='btn btn-primary mr-3' type='submit'>
//                 {/* {loading && (
//                   <span className='spinner-border spinner-border-sm mr-1'></span>
//                 )} */}
//                 Lưu
//               </button>
//               <Link className='btn btn-danger' to={UrlConstants.USERS_LIST}>
//                 Hủy
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default EditUser


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

const EditUser = () => {
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
    matTruocCCCD: '',
    matSauCCCD: '',
    maLTK: 0,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { email, tenNguoiDung, matKhau, gioiTinh, ngaySinh, soCCCD, sdt, matTruocCCCD, matSauCCCD, trangThaiTaiKhoan, trangThaiDangKy, maLTK } = formInputs;

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
        matTruocCCCD: user.matTruocCCCD || '',
        matSauCCCD: user.matSauCCCD || '',
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
      <h1 className="h3 mb-4 text-gray-800">Cập nhật người dùng</h1>
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

export default EditUser;

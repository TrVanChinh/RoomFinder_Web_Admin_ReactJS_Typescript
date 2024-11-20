import React, {ChangeEvent, Fragment, useEffect, useState, } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { IUser} from '../../../store/users/types'
import { deleteUsers, loadUsersPaging, loadUsersPagingByRole } from '../../../store/users/thunks';
import { Pagination } from '../../../components';
import { UrlConstants } from '../../../constans';
import swal from 'sweetalert'
import moment from 'moment';
import { loadRole } from '../../../store/role/thunks';
import { IRole } from '../../../store/role/types';

const User = () => {
    const users : IUser[] =  useSelector((state: AppState) => state.users.items);
    const totalItems = useSelector((state: AppState) => state.users.total);
    const pageSize = useSelector((state: AppState) => state.users.pageSize);
    const role: IRole[] = useSelector((state: AppState) => state.role.items)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    
    const [selectedDropDownItems, setSelectedDropDownItems] = useState<string>("")
    const [dropDownIndexItem, setDropDownIndexItem] = useState<number>(0)

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(loadRole())
        // dispatch(loadUsersPaging({ keyword: searchKeyword, currentPage: currentPage } ))
        dispatch(loadUsersPagingByRole({ keyword: dropDownIndexItem, currentPage: currentPage } ))
    },[dispatch, currentPage, searchKeyword, dropDownIndexItem])


    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // dispatch(loadUsersPagingByRole({ keyword: dropDownIndexItem, currentPage: pageNumber }));
    };

    const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const resetKeyword = () => {
        setSearchKeyword('');
        dispatch(loadUsersPaging({ keyword: '',  currentPage: 1 }))
        };

    const DateFormatted = (ngay: Date) => {
      const ngayDangKyFormatted = moment(ngay).format('DD/MM/YYYY')
      return ngayDangKyFormatted;
    } ;

      
    const handleSelectRow = (id: number) => {
      let newSelectedItems = [...selectedItems];
      selectedItems.indexOf(id) !== -1
        ? (newSelectedItems = selectedItems.filter((item) => item !== id))
        : newSelectedItems.push(id);
    
      setSelectedItems(newSelectedItems);
    };

        const handleDelete = () => {
          if (selectedItems) {
            swal({
              title: 'Xác nhận',
              text: 'Bạn có muốn xoá các bản ghi này?',
              icon: 'warning',
              buttons: ['Huỷ', 'Xác nhận'],
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                dispatch(deleteUsers(selectedItems));
                setSelectedItems([]);
              }
            });
          }
        };

        const handleDropdownClick = (maLTK: number, vaiTro: string) => {
          setSelectedDropDownItems(vaiTro);
          setDropDownIndexItem(maLTK);
          toggleDropdown();
        };

    const dropdownElements: JSX.Element[] = role.map((item) => (
      <button
        key={item.maLTK}
        className="dropdown-item"
        onClick={() => {
          handleDropdownClick(Number(item.maLTK), item.vaiTro);
        }}
      >
        {item.vaiTro}
      </button>
    ));
        

    const userElements: JSX.Element[] = users.map((user) => {
        return (
            <tr key={`user_${user.maNguoiDung}`}
            className={`table-row ${
              selectedItems.indexOf(user.maNguoiDung) !== -1 ? 'selected' : ''
            }`}
                onClick={() => handleSelectRow(user.maNguoiDung)}
            >
                <td>
                  <input
                    type='checkbox'
                    value={`${user.maNguoiDung}`}
                    onChange={() => handleSelectRow(user.maNguoiDung)}
                    checked={selectedItems.indexOf(user.maNguoiDung) !== -1}
                  />
                </td>
                <td>{user.tenNguoiDung}</td>
                <td>{user.email}</td>
                <td>{user.ngaySinh ? DateFormatted(user.ngaySinh): 'N/A'}</td>
                <td>{user.sdt}</td>
                <td>{user.soCCCD}</td>
                <td>{user.trangThaiDangKy ? 'Đã đăng ký' : 'Chưa đăng ký'}</td>
                <td>{user.ngayDangKy ? DateFormatted(user.ngayDangKy) : 'N/A'}</td>
                <td>
                  <Link to={UrlConstants.USER_EDIT + user.maNguoiDung}>
                    Sửa
                  </Link>
                </td>
            </tr>
        )
    }

    
    )

    return (
        <Fragment>
            <div>
            <h1 className="h3 mb-2 text-gray-800">Tables</h1>

            {showSearch && (
          <div className='row mb-3'>
            <div className='col-xl-12 col-md-12 mb-12'>
              <div className='card'>
                <h5 className='card-header'>Tìm kiếm</h5>
                <div className='header-buttons'>
                  <button
                    className='btn btn-default'
                    onClick={() => setShowSearch(false)}
                  >
                    Đóng
                    <i className='fas fa-times'></i>
                  </button>
                </div>
                <div className='card-body'>
                  <form className='form-inline'>
                    <div className='col-auto'>
                      <input
                        type='text'
                        value={searchKeyword}
                        onChange={handleKeywordPress}
                        className='form-control'
                        placeholder='Từ khoá'
                      />
                    </div>

                    <button
                      type='button'
                      onClick={() =>
                        dispatch(loadUsersPaging({ keyword: searchKeyword, currentPage }))
                      }
                      className='btn btn-primary my-1'
                    >
                      Tìm kiếm
                    </button>

                    <button
                      type='button'
                      onClick={() =>
                        resetKeyword()
                      }
                      className='btn btn-default my-1'
                    >
                      Xóa
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
           {/* DataTales Example */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách người dùng</h6>
                </div>
                <div className='header-buttons'>
                    <button
                    type='button'
                    className='btn btn-link'
                    onClick={() => setShowSearch(true)}
                    >
                    Tìm kiếm
                    </button>

                    <Link
                      to={UrlConstants.USER_ADD}
                      className='btn btn-outline-success btn-sm'
                    >
                      <span className='fa fa-plus'></span> Thêm mới
                    </Link>

                    {selectedItems.length > 0 && (
                    <Fragment>
                      <button
                        className='btn btn-outline-danger btn-sm'
                        onClick={handleDelete}
                      >
                        <span className='fa fa-trash'></span> Xoá
                      </button>
                      <button
                        className='btn btn-outline-primary   btn-sm'
                        onClick={() => setSelectedItems([])}
                      >
                        <i className='fas fa-check'></i> Bỏ chọn
                      </button>
                    </Fragment>
                  )}
                </div>

                

                <div className="card-body">
                    <div className="table-responsive">
                      
                      {/* Dropdown */}
                      <div className="dropdown mb-2">
                          {selectedDropDownItems === "" ? (
                            <button
                              onClick={toggleDropdown}
                              className="btn btn-primary dropdown-toggle"
                            >
                              Loại tài khoản
                            </button>
                          ) : (
                            <button
                              onClick={toggleDropdown}
                              className="btn btn-primary dropdown-toggle"
                            >
                              {selectedDropDownItems}
                            </button>
                          )}

                          {isOpen && (
                            <div className="dropdown-menu show">
                               <button
                                className="dropdown-item"
                                onClick={() => {
                                  toggleDropdown();
                                  setDropDownIndexItem(0)
                                  setSelectedDropDownItems("Tất cả")
                                }}
                              >
                                Tất cả
                              </button>
                              {dropdownElements}
                            </div>
                          )}
                        </div>
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Ngày sinh</th>
                                    <th>SĐT</th>
                                    <th>Số CCCD</th>
                                    <th>Trạng thái tài khoản</th>
                                    <th>Ngày đăng ký</th>
                                    <th></th>
                                </tr>
                            </thead>
                           
                            <tbody>
                                {userElements}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='card-footer'>
                    <Pagination
                    totalRecords={totalItems}
                    pageLimit={5}
                    pageSize={pageSize}
                    onPageChanged={onPageChanged}
                    ></Pagination>
                </div>
                </div>
                {/* <div className="dropdown">
    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
      Dropdown button
    </button>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#">Link 1</a>
      <a className="dropdown-item" href="#">Link 2</a>
      <a className="dropdown-item" href="#">Link 3</a>
    </div>
  </div> */}
            </div>
        </Fragment>

    )
}

export default User

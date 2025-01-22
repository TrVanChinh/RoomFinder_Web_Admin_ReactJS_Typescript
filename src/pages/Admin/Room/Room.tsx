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
import { IRoomType, RoomInfo } from '../../../store/rooms/types';
import { loadRoomsPagingByType, loadRoomsPaging, deleteRoom } from '../../../store/rooms/thunks';
import { roomService } from '../../../services/room.service';

const User = () => {
    const rooms : RoomInfo[] =  useSelector((state: AppState) => state.room.items);
    const totalItems = useSelector((state: AppState) => state.room.total);
    const pageSize = useSelector((state: AppState) => state.room.pageSize);

    const [currentPage, setCurrentPage] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const [selectedDropDownItems, setSelectedDropDownItems] = useState<string>("")
    const [selectedDropDownItemsRoomStatus, setSelectedDropDownItemsRoomStatus] = useState<string>("")

    const [dropDownIndexItem, setDropDownIndexItem] = useState<number>(0)
    const [dropDownIndexItemRoomStatus, setDropDownIndexItemRoomStatus] = useState<string>("Tất cả")

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenRoomStatus, setIsOpenRoomStatus] = useState(false);

    const [roomType, setRoomType] = useState<IRoomType[]>([]);
    
    const [roomStatus] = useState([
      { label: "Đã thuê", value: "Đã thuê" },
      { label: "Cho thuê", value: "Cho thuê" },
      { label: "Không duyệt", value: "Không duyệt" },
      { label: "Chờ duyệt", value: "Chờ duyệt" },
      { label: "Dừng cho thuê", value: "Dừng cho thuê" },
    ]);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const toggleDropdownRoomStatus = () => {
      setIsOpenRoomStatus(!isOpenRoomStatus);
    };

    const dispatch = useDispatch<AppDispatch>();

    const getRoomType = async() => {
      const response = await roomService.getRoomType();
      setRoomType(response);
    }
    
    useEffect(() => {
      getRoomType();
    },[])

    useEffect(() => {
      const roomTypeId = dropDownIndexItem === 0 ? null : dropDownIndexItem;
      const roomStatus = dropDownIndexItemRoomStatus === "Tất cả" ? null : dropDownIndexItemRoomStatus;
      console.log('Room type', roomTypeId)

      dispatch(loadRoomsPagingByType({
        roomTypeId,
        roomStatus,
        currentPage
      }));
    
    }, [dispatch, currentPage, dropDownIndexItem, dropDownIndexItemRoomStatus]);
    

    // useEffect(() => {
    //     dispatch(loadRoomsPagingByType({ keyword: dropDownIndexItem, currentPage: currentPage } ))
    // },[dispatch, dropDownIndexItem, dropDownIndexItemRoomStatus])

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const resetKeyword = () => {
        setSearchKeyword('');
        dispatch(loadRoomsPaging({ keyword: '',  currentPage: 1 }))
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
            text: 'Bạn có muốn xoá các phòng này?',
            icon: 'warning',
            buttons: ['Huỷ', 'Xác nhận'],
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              const stringIds = selectedItems.map((id) => id.toString());
              dispatch(deleteRoom(stringIds));
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

      const handleDropdownRoomStatusClick = (lable: string, value: string) => {
        setSelectedDropDownItemsRoomStatus(lable);
        setDropDownIndexItemRoomStatus(value);
        toggleDropdownRoomStatus();
      };


    const dropdownElements: JSX.Element[] = roomType.map((item) => (
      <button
        key={item.maLoaiPhong}
        className="dropdown-item"
        onClick={() => {
          handleDropdownClick(Number(item.maLoaiPhong), item.loaiPhong);
        }}
      >
        {item.loaiPhong}
      </button>
    ));

    const dropdownRoomStatus: JSX.Element[] = roomStatus.map((item) => (
      <button
        key={item.value}
        className="dropdown-item"
        onClick={() => {
          handleDropdownRoomStatusClick( item.label, item.value);
        }}
      >
        {item.label}
      </button>
    ));
        

    const roomElements: JSX.Element[] = rooms.map((room) => {
        return (
            <tr key={`room_${room.maPhong}`}
            className={`table-row ${
              selectedItems.indexOf(room.maPhong) !== -1 ? 'selected' : ''
            }`}
                onClick={() => handleSelectRow(room.maPhong)}
            >
                <td>
                  <input
                    type='checkbox'
                    value={`${room.maPhong}`}
                    onChange={() => handleSelectRow(room.maPhong)}
                    checked={selectedItems.indexOf(room.maPhong) !== -1}
                  />
                </td>
                <td>{room.nguoiDung?.tenNguoiDung}</td>
                <td>{room.tieuDe}</td>
                <td>{room.loaiPhong.loaiPhong}</td>
                <td>{room.dienTich}</td>
                <td>{room.giaPhong.toLocaleString()}</td>
                <td>{room.trangThaiPhong}</td>
                {/* <td>{room. ? DateFormatted(user.ngayDangKy) : 'N/A'}</td> */}
                <td>
                  <Link to={UrlConstants.ROOM_DETAIL + room.maPhong}>
                    Xem chi tiết
                  </Link>
                </td>
            </tr>
        )
    }

    
    )

    return (
        <Fragment>
            <div>
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
                        dispatch(loadRoomsPaging({ keyword: searchKeyword, currentPage }))
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
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách phòng</h6>
                </div>
                <div className='header-buttons'>
                    <button
                    type='button'
                    className='btn btn-link'
                    onClick={() => setShowSearch(true)}
                    >
                    Tìm kiếm
                    </button>

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

                        <div className="form-group d-flex align-items-center mb-2 gap-3">
                          {/* Dropdown */}
                          <div className="dropdown  ml-4">
                            {selectedDropDownItems === "" ? (
                              <button
                                onClick={toggleDropdown}
                                className="btn btn-primary dropdown-toggle"
                              >
                                Loại phòng
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
                                    setDropDownIndexItem(0);
                                    setSelectedDropDownItems("Tất cả");
                                  }}
                                >
                                  Tất cả
                                </button>
                                {dropdownElements}
                              </div>
                            )}
                          </div>

                          {/* Dropdown Room Status */}
                          <div className="dropdown  ml-4">
                            {selectedDropDownItemsRoomStatus === "" ? (
                              <button
                                onClick={toggleDropdownRoomStatus}
                                className="btn btn-primary dropdown-toggle"
                              >
                                Trang thái phòng
                              </button>
                            ) : (
                              <button
                                onClick={toggleDropdownRoomStatus}
                                className="btn btn-primary dropdown-toggle"
                              >
                                {selectedDropDownItemsRoomStatus}
                              </button>
                            )}

                            {isOpenRoomStatus && (
                              <div className="dropdown-menu show">
                                <button
                                  className="dropdown-item"
                                  onClick={() => {
                                    toggleDropdownRoomStatus();
                                    setDropDownIndexItemRoomStatus("Tất cả");
                                    setSelectedDropDownItemsRoomStatus("Tất cả");
                                  }}
                                >
                                  Tất cả
                                </button>
                                {dropdownRoomStatus}
                              </div>
                            )}
                          </div>
                        </div>

                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Tên chủ phòng</th>
                                    <th>tiêu đề phòng</th>
                                    <th>Loại phòng</th>
                                    <th>Diện tích (m2)</th>
                                    <th>Giá phòng (vnđ)</th>
                                    <th>Trạng thái phòng</th>
                                    <th></th>
                                </tr>
                            </thead>
                           
                            <tbody>
                                {roomElements}
                                
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

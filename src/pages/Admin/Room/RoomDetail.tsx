import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { approveRoom, getRoomById, rejectRoom, updateRoomStatus } from '../../../store/rooms/thunks';
import { AppDispatch, AppState } from '../../../store';
import moment from 'moment';
import { IInterior } from '../../../store/rooms/types';
import { UrlConstants } from '../../../constans';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const room = useSelector((state: AppState) => state.room.roomDetails);
  const loading = useSelector((state: AppState) => state.room.loading);
  const [roomStatus, setRoomStatus] = useState(room?.trangThaiPhong)
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
  const [interior] = useState([
    { label: "Bàn ghế", column: "banGhe" },
    { label: "Sofa", column: "sofa" },
    { label: "wifi", column: "wifi" },
    { label: "Tủ lạnh", column: "tuLanh" },
    { label: "Giường", column: "giuong" },
    { label: "chăn ga gối", column: "chanGaGoi" },
    { label: "Tủ quần áo", column: "tuQuanAo" },
    { label: "Đồ dùng nhà bếp", column: "doDungBep" },
    { label: "Điều hòa", column: "dieuHoa" },
    { label: "Máy nóng lạnh", column: "nongLanh" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage("");
  };
  useEffect(() => {
    if (id) {
      dispatch(getRoomById(id));
    }
  }, [dispatch, id]);

  const handleRejectClick = () => {
    setRejectModalOpen(true);
  };

  const handleCloseModal = () => {
    setRejectModalOpen(false);
  };

  const handleDropdownChange = (value: string) => {
    setRoomStatus(value);
  };

  const handleUpdate = async() => {
    if(roomStatus && id) {
      try {
        const resultAction = await dispatch(updateRoomStatus({roomId: id, roomStatus}));
        navigate(UrlConstants.ROOM);
      } catch (error) {
        console.error('Error rejecting user:', error);
        alert('An error occurred while rejecting the user.');
      }
    }
    
  }

  const handleApprove = async () => {
    if (id) {
      const resultAction = await dispatch(approveRoom(id));
      if (approveRoom.fulfilled.match(resultAction)) {
        navigate(UrlConstants.ROOM);
      } else {
        console.error('Failed to update user:', resultAction.payload);
      }
    }
  };

  const handleRejectSubmit = async () => {
    if (id) {
      setRejectModalOpen(true); 
      const resultAction = await dispatch(rejectRoom({ roomId :id, reason: rejectionReason }));
      if (rejectRoom.fulfilled.match(resultAction)) {
        navigate(UrlConstants.ROOM);
      } else {
        console.error('Failed to update user:', resultAction.payload);
      }
    }
  };
  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    
    <Fragment>
      
      <h1 className="h3 mb-4 text-gray-800">Thông tin chi tiết phòng</h1>
      <div className="card">
        <div className="card-header">Thông tin phòng</div>
        <div className="card-body">
          <div className="form-group">
            <label>Tiêu đề</label>
            <p className="form-control">{room.tieuDe}</p>
          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <pre
                className="form-control"
                style={{
                    height: '200px', // Giới hạn chiều cao
                    overflowY: 'scroll', // Thanh cuộn
                }}
            >
                {room.moTa}
            </pre>
        </div>


          <div className="form-group">
            <label>Địa chỉ</label>
            <p className="form-control">
              {room.diaChi.soNha}, {room.diaChi.phuongXa}, {room.diaChi.quanHuyen}, {room.diaChi.tinhThanh}
            </p>
          </div>

          <div className="form-group">
            <label>Loại phòng</label>
            <p className="form-control">{room.loaiPhong.loaiPhong}</p>
          </div>

          <div className='row ml-1'>
            <div className="form-group">
              <label>Diện tích</label>
              <p className="form-control text-center">{room.dienTich} m2</p>
            </div>

            <div className="form-group ml-4">
              <label>Số Tầng</label>
              <p className="form-control text-center">{room.soTang}</p>
            </div>

            <div className="form-group ml-4">
              <label>Số người ở tối đa</label>
              <p className="form-control text-center">{room.soNguoiToiDa}</p>
            </div>

            <div className="form-group ml-4">
              <label>Số phòng ngủ</label>
              <p className="form-control text-center">{room.soLuongPhongNgu}</p>
            </div>
          </div>
          

          <div className='row ml-1'>
            <div className="form-group">
              <label>Giá phòng</label>
              <p className="form-control">{room.giaPhong.toLocaleString()} VND</p>
            </div>

            <div className="form-group ml-4">
              <label>Giá điện</label>
              <p className="form-control">{room.giaDien.toLocaleString()} VND</p>
            </div>

            <div className="form-group ml-4">
              <label>Giá nước</label>
              <p className="form-control">{room.giaNuoc.toLocaleString()} VND</p>
            </div>
          </div>
          

          <div className="form-group">
            <label>Chi phí đặt cọc</label>
            <ul className="list-group">
              {room.chiPhiDatCoc.map((deposit) => (
                <li key={deposit.maPhiDatCoc} className="list-group-item">
                  {deposit.phiDatCoc.toLocaleString()} VND - {deposit.thoiHanDatCoc} {deposit.donViThoiGian}
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="form-group">
            <label>Nội thất</label>
            <ul className="list-group">
              {Object.entries(room.noiThat).map(([key, value]) => (
                <li key={key} className="list-group-item">
                  {key}: {value ? 'Có' : 'Không'}
                </li>
              ))}
            </ul>
          </div> */}

        <div className="form-group">
            <label>Nội thất</label>
            <div className="d-flex flex-wrap">
                {interior
                .filter((item) => room.noiThat[item.column as keyof IInterior])
                .map((item) => (
                    <span
                    key={item.column}
                    className="badge bg-light text-dark m-1 "
                    style={{
                        borderRadius: "20px",
                        padding: "10px 15px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                    >
                    {item.label}
                    </span>
                ))}
            </div>
        </div>


          {/* <div className="form-group">
            <label>Hình ảnh</label>
            <div className="row">
              {room.hinhAnh.map((image) => (
                <div key={image.maHinhAnh} className="col-md-4 mb-3">
                  {image.loaiTep === 'Hình ảnh' ? (
                    <img
                      src={image.duongDan}
                      alt={image.danhMucHinhAnh}
                      className="img-fluid"
                      style={{ maxHeight: '200px' }}
                    />
                  ) : (
                    <video controls className="img-fluid" style={{ maxHeight: '200px' }}>
                      <source src={image.duongDan} type="video/mp4" />
                    </video>
                  )}
                </div>
              ))}
            </div>
          </div> */}
          <div className="form-group">
            <label>Hình ảnh</label>
            <div className="card">
              {[
                { title: "Hình ảnh căn phòng", key: "Hình ảnh căn phòng" },
                { title: "Giấy chứng nhận quyền sử dụng đất", key: "Giấy chứng nhận quyền sử dụng đất" },
                { title: "Giấy chứng nhận đủ điều kiện về phòng cháy chữa cháy", key: "Giấy chứng nhận đủ điều kiện về phòng cháy chữa cháy" },
                { title: "Giấy phép kinh doanh hộ gia đình", key: "Giấy phép kinh doanh hộ gia đình" },
              ].map((category) => (
                <div key={category.key} className="mb-4 ml-4">
                  <label>{category.title}</label>
                  <div className="row">
                    {room.hinhAnh
                      .filter((image) => image.danhMucHinhAnh === category.key)
                      .map((image) => (
                        <div key={image.maHinhAnh} className="col-md-4 mb-3">
                          {image.loaiTep === "Hình ảnh" ? (
                            <img
                              src={image.duongDan}
                              alt={image.danhMucHinhAnh}
                              className="img-fluid"
                              style={{ maxHeight: "200px" }}
                              onClick={() => openModal(image.duongDan)} 
                            />
                          ) : (
                            <video controls className="img-fluid" style={{ maxHeight: "200px" }}>
                              <source src={image.duongDan} type="video/mp4" />
                            </video>
                          )}
                        </div>
                      ))}
                  </div>
                  {room.hinhAnh.filter((image) => image.danhMucHinhAnh === category.key).length === 0 && (
                    <p className="text-muted">Không có hình ảnh nào thuộc danh mục này.</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Chủ phòng</label>
            <div className="card">
              <div className="card-body">
                <p>Tên: {room.nguoiDung?.tenNguoiDung}</p>
                <p>Email: {room.nguoiDung?.email}</p>
                <p>Số điện thoại: {room.nguoiDung?.sdt}</p>
              </div>
            </div>
          </div>
          {room.trangThaiPhong==="Chờ duyệt" ? (
            <div>
              <button className="btn btn-primary mr-3" type="button" disabled={loading} onClick={handleApprove}>
              {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Duyệt
            </button>

            <button className="btn btn-danger mr-3" type="button" disabled={loading} onClick={handleRejectClick}>
              {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Từ chối
            </button>
            </div>
          ):(
            <div>
            <div className="form-group" >
              <label>Trạng thái phòng</label>
              <div>
              <select
                className="btn dropdown-toggle border "
                name="trangthaiphong"
                value={roomStatus}
                onChange={(e) => handleDropdownChange( e.target.value)}
              >
                <option value="Cho thuê">Cho thuê</option>
                <option value="Đã thuê">Đã thuê</option>
                <option value="Dừng cho thuê">Dừng cho thuê</option>
              </select>
              </div>
            </div>

          <button
            className="btn btn-primary mr-3"
            type="button"
            disabled={loading}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>

          <button
            className="btn btn-success mr-3"
            type="button"
            disabled={loading}
            onClick={handleUpdate}
          >
            Cập nhật
          </button> 
        </div>
          )}
        </div>
      </div>

      {isRejectModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Lý do từ chối</h5>
                <button type="button" className="close" data-dismiss="modal" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <textarea
                    className="form-control"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Đóng
                </button>
                <button type="button" className="btn btn-danger" onClick={handleRejectSubmit}>
                  Gửi lý do từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {/* <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Viewer"
        style={{
          content: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.8)",
            border: "none",
            inset: "0px",
            padding: "0",
          },
          overlay: {
            zIndex: 1000,
          },
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={selectedImage}
            alt="Full View"
            style={{ maxWidth: "100%", maxHeight: "100vh" }}
          />
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      </Modal> */}
    </Fragment>
  );
};

export default RoomDetail;

import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { loadReportRoomsPaging} from '../../../store/rooms/thunks'
import { Pagination } from '../../../components';
import { ReportRoomInfo } from '../../../store/rooms/types';
import moment from 'moment';

const ReportRoom = () => {
  const reportRooms: ReportRoomInfo[] = useSelector((state: AppState) => state.room.reportRooms);
  const totalItems = useSelector((state: AppState) => state.room.total);
  const pageSize = useSelector((state: AppState) => state.room.pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadReportRoomsPaging({ currentPage }));
    // Giả lập gọi API cho báo cáo
  }, [dispatch, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectRow = (id: number) => {
    let newSelectedItems = [...selectedItems];
    selectedItems.indexOf(id) !== -1
      ? (newSelectedItems = selectedItems.filter((item) => item !== id))
      : newSelectedItems.push(id);
    setSelectedItems(newSelectedItems);
  };

  const reportRoomElements: JSX.Element[] = reportRooms.map((report, index) => {
    const { room, userName, reason } = report;
    return (
      <tr
        key={`report_${index}`}
        className={`table-row ${selectedItems.indexOf(room.maPhong) !== -1 ? 'selected' : ''}`}
        onClick={() => handleSelectRow(room.maPhong)}
      >
        <td>
          <input
            type="checkbox"
            value={`${room.maPhong}`}
            onChange={() => handleSelectRow(room.maPhong)}
            checked={selectedItems.indexOf(room.maPhong) !== -1}
          />
        </td>
        <td>{userName}</td>
        <td>{room.tieuDe}</td>
        <td>{room.giaPhong.toLocaleString()} VND</td>
        <td>{room.nguoiDung?.tenNguoiDung}</td>
        <td>{room.nguoiDung?.sdt}</td>
        <td>{reason}</td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Danh sách báo cáo phòng</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Người báo cáo</th>
                    <th>Tiêu đề</th>
                    <th>Giá thuê (VND)</th>
                    <th>Chủ phòng</th>
                    <th>SĐT</th>
                    <th>Lý do</th>
                  </tr>
                </thead>
                <tbody>{reportRoomElements}</tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <Pagination
              totalRecords={totalItems}
              pageLimit={5}
              pageSize={pageSize}
              onPageChanged={onPageChanged}
            ></Pagination>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReportRoom;

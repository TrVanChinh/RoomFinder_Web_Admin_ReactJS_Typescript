import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store';
import { loginUser } from '../../store/account/thunks';
import { useLocation, useNavigate  } from 'react-router';
import backgroundImage from '../../assets/image/logoRoomFinder.png';
export const Login = () => {
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState(''); 
    // const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: AppState) => state.account.loading);
    const error = useSelector((state: AppState) => state.account.error);

    const location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(logoutUser());
    // }, [error, dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'matKhau') { // Đổi password thành matKhau
            setMatKhau(value);
        }
    };

    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
    //     e.preventDefault();
    //     setSubmitted(true);
    //     if (email && matKhau) { 
    //         const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
    //         dispatch(loginUser({ email, matKhau }))
    //             .unwrap()
    //             .then(() => {
    //                 navigate(from);
    //             })
    //             .catch((err: any) => {
    //                 console.error("Login failed:", err);
    //                 if (err && typeof err === 'object' && 'status' in err) {
    //                     console.error("Error status:", err.status); // Kiểm tra lỗi nếu có `status`
    //                 } else {
    //                     console.error("Unknown error format:", err); // Trường hợp lỗi không có `status`
    //                 }
    //             });
    //     }
    // }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        setSubmitted(true);
        if (email && matKhau) { 
            // Luôn điều hướng đến /user sau khi đăng nhập thành công
            dispatch(loginUser({ email, matKhau }))
                .unwrap()
                .then(() => {
                    navigate('/requires-account'); // Điều hướng cố định đến trang /user
                })
                .catch((err: any) => {
                    console.error("Login failed:", err);
                    if (err && typeof err === 'object' && 'status' in err) {
                        console.error("Error status:", err.status); // Kiểm tra lỗi nếu có `status`
                    } else {
                        console.error("Unknown error format:", err); // Trường hợp lỗi không có `status`
                    }
                });
        }
    };
    

    return (
        <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row d-flex"> {/* Thêm d-flex vào row */}
                                <div className="col-lg-6 d-none d-lg-block ">
                                    <img src={backgroundImage} alt="Background" style={{width:"100%", height:"100%", objectFit: "cover"}}/>
                                </div>
                                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Chào mừng bạn trở lại!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input 
                                                    type="email" 
                                                    className={`form-control form-control-user ${submitted && !email ? 'is-invalid' : ''}`}
                                                    onChange={handleChange} name="email" 
                                                    id="exampleInputEmail" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Enter Email Address..." />
                                                {submitted && !email && (
                                                    <div className="invalid-feedback">
                                                        Please enter a valid email address.
                                                    </div>
                                                ) }
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className={`form-control form-control-user ${submitted && !matKhau ? 'is-invalid' : ''}`} onChange={handleChange} name="matKhau" id="exampleInputPassword" placeholder="Password" />
                                                {submitted && !matKhau && (
                                                    <div className="invalid-feedback">
                                                        Please enter a valid password
                                                    </div>
                                                ) }
                                            </div>
                                            {/* <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                    <label className="custom-control-label" htmlFor="customCheck">Lưu </label>
                                                </div>
                                            </div> */}
                                            <div className="form-group d-flex justify-content-center"> {/* Thêm d-flex và justify-content-center */}
                                                {loading && (
                                                    <span className='spinner-border spinner-border-sm mr-1'></span>
                                                )}
                                                <button className="btn btn-primary">
                                                    Đăng nhập
                                                </button>
                                            </div>
                                           
                                        </form>
                                        <hr />
                                        {/* <div className="text-center">
                                            <a className="small" href="forgot-password.html">Quên mật khẩu?</a>
                                        </div> */}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}


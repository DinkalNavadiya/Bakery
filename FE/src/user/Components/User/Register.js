import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../../Contexts/authContext';
import { useForm } from '../../../util/Hooks';
import { useNavigate } from 'react-router-dom';
import { Register_User } from '../../../Graphql/User';
import { Add_Profile, getProfile } from '../../../Graphql/Profile';
import { toast } from 'react-toastify';

const Register = () => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    let navigate = useNavigate();
    function registerUserCallback() {
        registerUser();
    }
    const { onChange, values, onSubmit , valueChange } = useForm(registerUserCallback, {
        name: '',
        email: '',
        password: '',
        // User_Confirm_Password: '',
        phone_number: '',
    });
    const [addProfile] = useMutation(Add_Profile)
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password")
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            setConfirmPasswordType("text")
            return;
        }
        setPasswordType("password")
        setConfirmPasswordType("password")
    }

    const [registerUser] = useMutation(Register_User, {
        update(proxy, { data: { registerUser: DataUser } }) {
            context.register(DataUser);
            navigate("/verify");
            addProfile({
                variables: {
                    userId: DataUser.id,
                    name: DataUser.name,
                    email: DataUser.email,
                    phone_number: DataUser.phone_number,
                    role: DataUser.role
                }, refetchQueries: [
                    { query: getProfile }
                ]
            })
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
            // console.log(graphQLErrors);
            errors.map(function (error) {
                return (
                    toast.error(error.message)
                )
            })
        },
        variables: { registerInput: values }
    });
  

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-title">
                            REGISTER PANEL
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <div className="form-group">
                                    <label className="form-control-label">USERNAME</label>
                                    <input type="text" name='name' onChange={onChange} className="res_input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">EMAIL</label>
                                    <input type="email" name='email' className="res_input" onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type={passwordType} name='password' className="res_input" onChange={onChange} autoComplete="off" />
                                    <div className='eye-icons' onClick={togglePassword}>
                                        {passwordType === "password" ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">CONFIRM PASSWORD</label>
                                    <input type={confirmPasswordType} name='confirmPassword' className="res_input" onChange={valueChange} autoComplete="off" />
                                    <div className='eye-icons' onClick={togglePassword}>
                                        {confirmPasswordType === "password" ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Phone Number</label>
                                    <input type="text" name='phone_number' className="res_input" onChange={onChange} />
                                </div>
                                <div className='form-group'>
                                    <button type="submit" className="btn btn-outline-primary" onClick={onSubmit}>SIGNUP</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;


import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../../Contexts/authContext';
import { useForm } from '../../../util/Hooks';
import { useNavigate } from 'react-router-dom';
import { Register_User } from '../../../Graphql/User';
import { Add_Profile, getProfile } from '../../../Graphql/Profile';

const Register = () => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    // console.log(errors);

    let navigate = useNavigate();
    function registerUserCallback() {
        registerUser();
    }
    const { onChange, values, onSubmit } = useForm(registerUserCallback, {
        name: '',
        email: '',
        password: '',
        // User_Confirm_Password: '',
        phone_number: '',
    });
    const [addProfile] = useMutation(Add_Profile)

    const [registerUser] = useMutation(Register_User, {
        update(proxy, { data: { registerUser: DataUser } }) {
            context.register(DataUser);
            navigate("/");
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
            console.log(graphQLErrors);
        },
        variables: { registerInput: values }
    });
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

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
                                {/* <form onSubmit={onSubmit}> */}
                                    <div className="form-group">
                                        <label className="form-control-label">USERNAME</label>
                                        <input type="text" name='name' className="form-control" onChange={onChange} />
                                        <h1>{errors.message}</h1>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">EMAIL</label>
                                        <input type="email" name='email' className="form-control" onChange={onChange} />
                                        {/* <h1>{errors.message}</h1> */}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input type={passwordType} name='password' className="form-control" onChange={onChange} autoComplete="on" />
                                        <div className='eye-icons' onClick={togglePassword}>
                                            {passwordType === "password" ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                                        </div>
                                        {/* <h1>{errors.message}</h1> */}
                                    </div>
                                    {/* <div className="form-group">
                                        <label className="form-control-label">CONFIRM PASSWORD</label>
                                        <input type={passwordType} name='User_Confirm_Password' className="form-control" onChange={onChange} autoComplete="on" />
                                        <div className='eye-icons' onClick={togglePassword}>
                                            {passwordType === "password" ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                                        </div>
                                    </div> */}
                                    <div className="form-group">
                                        <label className="form-control-label">Phone Number</label>
                                        <input type="text" name='phone_number' className="form-control" onChange={onChange} />
                                        {/* <h1>{errors.message}</h1> */}
                                    </div>
                                    <div className='form-group'>
                                        <button type="submit" className="btn btn-outline-primary" onClick={onSubmit}>SIGNUP</button>
                                    </div>
                                    <div className='error'>{
                                        errors.map(function (error) {
                                            return (
                                                <h1>{error.message}</h1>
                                            )
                                        })
                                    }
                                    </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;


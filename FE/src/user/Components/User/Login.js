import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Contexts/authContext';
import { useForm } from '../../../util/Hooks';
import { Login_User } from "../../../Graphql/User"
const Login = () => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  function LoginUserCallback() {
    loginUser()
  }
  const { onChange, onSubmit, values } = useForm(LoginUserCallback, {
    email: '',
    password: '',
  })
  const [passwordType, setPasswordType] = useState("password");

  const [loginUser] = useMutation(Login_User, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/");
      // if (UserData?.role === "admin" || UserData?.role === "superAdmin") {
      //     addProfile({
      //         variables: {
      //             userId: userData.id,
      //             User_name: userData.User_name,
      //             email: userData.email,
      //             User_Phone_Number: userData.User_Phone_Number,
      //             role: userData.role
      //         }, refetchQueries: [
      //             { query: getProfile }
      //         ]
      //     })
      // }
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values }
  })
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password");
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-title">
              LOGIN PANEL
            </div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                {/* <form onSubmit={onSubmit}> */}
                <div className="form-group">
                  <label className="form-control-label">
                    EMAIL
                  </label>
                  <input type="text" name='email' className="form-control" onChange={onChange} />
                  <h1>{errors.message}</h1>
                </div>
                <div className="form-group">
                  <label className="form-control-label">
                    PASSWORD
                  </label>
                  <input type={passwordType} name='password' className="form-control" onChange={onChange} id="myInput" />
                  <div className='eye-icons' onClick={togglePassword}>
                    {passwordType === "password" ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i>}
                  </div>
                </div>
                <div className='form-group'>
                  <button type="submit" className="btn btn-outline-primary" onClick={onSubmit}>LOGIN</button>
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

export default Login;
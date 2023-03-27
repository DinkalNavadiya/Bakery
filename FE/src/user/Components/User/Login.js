import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Contexts/authContext';
import { useForm } from '../../../util/Hooks';
import { Login_User } from "../../../Graphql/User"
import { toast } from 'react-toastify';
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
    },
    onError({ graphQLErrors }) {
      // debugger
      // console.log(graphQLErrors);
      setErrors(graphQLErrors);
      // toast(errors)
      // console.log(errors.message);
      errors.map(function (error) {
        return (
          toast.error(error.message)
        )
      })
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
                  <button type="submit" className="btn btn-outline-primary" onClick={onSubmit}>SIGNIN</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login;
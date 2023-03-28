import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { CHG_PASS, getUsers } from '../../../Graphql/User.js'
import { toast } from 'react-toastify';

const Password = () => {
  const [changePassword] = useMutation(CHG_PASS)
  const [password, setPassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: ""
  })
  const onSubmit = (e) => {
    e.preventDefault();
    const UserData = JSON.parse(localStorage.getItem("UserData"))
    if (password.newPassword === password.confirmPassword) {
      changePassword({
        variables: {
          email: UserData?.email,
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        }, refetchQueries: [
          { query: getUsers }
        ]
      })
      toast("Password change")
    } else {
      toast("password mismatch")
    }

  }
  return (
    <>
      <div className="main" id="settings" aria-labelledby="home-tab">
        <form name="frmChange" action=""
          onSubmit={onSubmit}>
          <div className="validation-message text-center"></div>
          <h2 className="text-center">Change Password</h2>
          <h4>oldPassword:</h4>
          <input type="password" onChange={e => setPassword({ ...password, oldPassword: e.target.value })} />
          <h4>newPassword:</h4>
          <input type="password" onChange={e => setPassword({ ...password, newPassword: e.target.value })} />
          <h4>confirmPassword</h4>
          <input type="password" onChange={e => setPassword({ ...password, confirmPassword: e.target.value })} />
          <br /><br />
          <button className='btn'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Password
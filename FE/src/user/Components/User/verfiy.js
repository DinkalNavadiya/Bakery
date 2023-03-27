import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { Users } from '../../../Graphql/User';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Code = () => {
  const [code, setCode] = useState('')
  // const { data } = useQuery(Users)
  // console.log(data);
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  let navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    if (UserData?.ver_code === code) {
      toast("Welcome to Bakery")
      navigate("/");
    } else {
      // console.log("error");
      toast("Invalid Code")
    }
  }
  return (
    <>
      <div className='verify'>
        <form className="content-area">
          <h4>Verify Login Code</h4>
          <h5>Welcome Back!</h5>
          <p>
            It looks like you're trying to login from a new device.
            As an added security mesure, please enter the 4-character code sent to your email.
          </p>
          <fieldset className='number-code'>
            <legend>Security Code</legend>
            <div>
              <input type="number" onChange={(e) => setCode(e.target.value)} />
            </div>
          </fieldset>
          <p>Resend Code</p>
          <input type="submit" value="Submit" onClick={(e) => handleChange(e)} />
        </form>
      </div>
    </>
  )
}

export default Code
import React from 'react'
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import AddUser from '../../../admin/Components/User/AddUser';
import { User_delete, Users } from '../../../Graphql/User';
import Navbar from '../../Navbar';

const User = () => {
  const { data  , refetch} = useQuery(Users);
  // console.log("userdata", data);
  const [deleteUser] = useMutation(User_delete)
  const removeUser = (id) => {
    deleteUser({
      variables: {
        id: id
      }
    }).then(() => {
      refetch();
    })
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="App-header">
          {/* <input className='modal-btn'/> */}
          <input className="modal-btn" type="checkbox" id="modal-btn" name="modal-btn" />
          <label htmlFor='modal-btn'>
          Add User
          </label>
          <AddUser/>
          {/* <button className='login-btn'>add user</button> */}
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">Name</div>
              <div className="col col-1">Email</div>
              <div className="col col-1">PhoneNo.</div>
              <div className="col col-1">Role</div>
              <div className='col col-1'>Action</div>
            </li>
            {data?.User.map(user => {
              return (
                <>
                  <li className="table-row" key={user.id}>
                    <div className="col col-1">{user.name}</div>
                    <div className="col col-1">{user.email}</div>
                    <div className="col col-1">{user.phone_number}</div>
                    <div className="col col-1">{user.role}</div>
                    <div className='col col-1'>
                      <div className='icons'>
                        <i className="fa fa-trash" onClick={() => removeUser(user.id)}></i>
                      </div>
                    </div>
                  </li>
                </>
              )
            })}

          </ul>
        </div>
      </div>
    </>
  )
}

export default User
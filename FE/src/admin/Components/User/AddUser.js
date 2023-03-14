// import React, { useContext, useState } from 'react'
// import { AuthContext } from '../../../Contexts/authContext'
// // import Register from './Register';
// import { useForm } from '../../../util/Hooks';
// import { useMutation } from '@apollo/client';
// import { Register_User } from '../../../Graphql/User';

// const AddUser = () => {
//   // const context = useContext(AuthContext);
//   // const [errors, setErrors] = useState([]);
//   // console.log(errors);
//   // function registerUserCallback() {
//   //   registerUser()
//   // }
//   // const { onChange, values, onSubmit } = useForm(registerUserCallback, {
//   //   name: '',
//   //   email: '',
//   //   password: '',
//   //   User_Confirm_Password: '',
//   //   phone_number: '',
//   // });
//   // const [registerUser] = useMutation(Register_User, {
//   //   update(proxy, { data: { registerUser: usersData } }) {
//   //     context.addUser(usersData);
//   //     console.log(usersData);
//   //   },
//   //   onError({ graphQLErrors }) {
//   //     setErrors(graphQLErrors);
//   //   },
//   //   variables: { registerInput: values }
//   // })
//   const context = useContext(AuthContext);
//   const [errors, setErrors] = useState([]);
//   console.log(errors);
//   function registerUserCallback() {
//     registerUser()
//     // console.log("registerdata");
//   }
//   // const UserData = JSON.parse(localStorage.getItem("UserData"))

//   const { onChange, values, onSubmit } = useForm(registerUserCallback, {
//     name: '',
//     email: '',
//     password: '',
//     // User_Confirm_Password: '',
//     phone_number: '',
//   });
//   console.log(values);
//   // const [registerUser] = useMutation(Register_User)
//   // let registerInput = {
//   //   name:
//   //       email
//   //       password
//   //       phone_number
//   //       token
//   //       RoleId
//   //       role
//   //       createdBy
//   // }
//   const [registerUser] = useMutation(Register_User
//     , {
//       update(proxy, { data: { registerUser: usersData } }) {
//         context.addUser(usersData);
//         console.log(usersData);
//       },
//       onError({ graphQLErrors }) {
//         setErrors(graphQLErrors);
//       },
//       variables: { registerInput: values }
//     }
//   )
//   return (
//     <>
//       <div className="modal" key="">
//         <div className="modal-wrap">
//           {/* <form action="/action_page.php" key={item.id}> */}
//           <div className="container">
//             <h1>Register</h1>
//             <p>Please fill in this form to create an account.</p>
//             <hr />

//             <label htmlFor="name"><b>Name</b></label>
//             <input type="text" placeholder="Enter Name" name="name" required onChange={onChange} />

//             <label htmlFor="email"><b>Email</b></label>
//             <input type="text" placeholder="Enter Email" name="email" required onChange={onChange} />

//             <label htmlFor="psw"><b>Password</b></label>
//             <input type="password" placeholder="Enter Password" name="password" required onChange={onChange} />

//             {/* <label for="psw-repeat"><b>Repeat Password</b></label>
//               <input type="password" placeholder="Repeat Password" name="User_Confirm_Password" required onChange={onChange} /> */}

//             <label htmlFor="psw-repeat"><b>Phone Number</b></label>
//             <input type="text" placeholder="Phone Number" name="phone_number" required onChange={onChange} />
//             <hr />

//             <button type="submit" className="registerbtn" onClick={onSubmit}>Register</button>
//           </div>
//           {/* </form> */}
//         </div>
//       </div>
//     </>
//   )
// }

// export default AddUser

import React from 'react'
// import Register from './Register'

const AddUser = () => {
  return (
    <div className="modal">
      {/* <div className="modal-wrap"> */}
        {/* <Register /> */}
      {/* </div> */}
    </div>
  )
}

export default AddUser
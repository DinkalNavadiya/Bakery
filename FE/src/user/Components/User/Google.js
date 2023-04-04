// import React from 'react'
// import { useEffect } from 'react';


// const Google = () => {
//   const handleCallbackResponse = (res) => {
//     console.log("JWT Token::", res.credential);
//   }
//   useEffect(() => {
//     // eslint-disable-next-line
//     google.accounts.id.initialize({
//       client_id: '906929346336-o4kmo7fia5u7a0pfvar4g0no0137cnhc.apps.googleusercontent.com',
//       callback: handleCallbackResponse
//     })
//     // eslint-disable-next-line
//     google.accounts.id.renderButton(
//       document.getElementById("signInDiv"),
//       { theme: "outline", size: "large" }
//     )
//   }, [])
//   return (
//     <>
//       <div id="signInDiv">
//         {/* <div id="customBtn" className="customGPlusSignIn">
//           <span className="icon"></span>
//           <span className="buttonText" id="signInDiv">Google</span> */}
//         {/* </div> */}
//       </div>
//     </>
//   )
// }

// export default Google
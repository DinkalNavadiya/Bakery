import React, { useContext } from 'react'
import './Profile.css'
// import { getProfile, Profiles } from '../../../Graphql/Query';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ItemContext } from '../../../Contexts/Context';
import { useMutation } from '@apollo/client';
// import { Update_Profile } from '../../../Graphql/Mutation';
import { getProfile, Profiles, Update_Profile } from '../../../Graphql/Profile';
const AddProfile = () => {
  const { data } = useQuery(Profiles)
  const UserData = JSON.parse(localStorage.getItem("UserData"))

  const [profile, setProfile] = useState({
    userId: "",
    Image: "",
    name: "",
    email: "",
    phone_number: "",
    role: ""
  })
  const { profileId, profileSetId } = useContext(ItemContext)
  const [image, setImage] = useState('');
  const uploadProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result.toString());
        setImage(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
    // console.log("Base64::", image);
    if (file == null) {
      console.log("null");
    }
  }
  const { data: _ } = useQuery(getProfile, {
    variables: { id: profileId }, onCompleted: (data) => setProfile(data.getProfile)
  });
  // console.log(getData);
  const [updateProfile] = useMutation(Update_Profile);
  const onSubmit = () => {
    if (profileId === 0) {
      // null
    } else {
      console.log("update");
      updateProfile({
        variables: {
          id: profileId,
          Image: image,
          name: profile.name,
          email: profile.email,
          phone_number: profile.phone_number,
          role: profile.role,
        }, refetchQueries: [
          { query: getProfile }
        ]
      })
    }
  }
  return (
    <>
      {data?.Profile.map(prf => {
        return (
          <>
            {UserData?.id === prf.userId ?
              <>
                <div className="navbar-top">
                  <div className="title">
                    <h1>Profile</h1>
                  </div>
                  <ul>
                    <li>
                      <a href="#sign-out">
                        <i className="fa fa-sign-out-alt fa-2x"></i>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sidenav">
                  <div className="profile">
                    <div className='icon'>
                      {profileId === 0 ?
                        <>
                          {image ?
                            <img src={image} alt="" /> : <img src={prf.Image} alt="" />
                          }
                        </> :
                        <>
                          {image ?
                            <img src={image} value={prf.Image} onChange={e => setProfile({ ...profile, Image: e.target.files[0] })} alt="" />
                            :
                            <img src={prf.Image} alt="" onChange={e => setProfile({ ...profile, Image: e.target.files[0] })} />
                          }
                          {/* <img src={Default} alt="" /> */}
                          <div className='overlay'>
                            <label htmlFor="photo">
                              <i className="fa fa-camera"></i>
                            </label>
                            <input type="file" accept="image/" style={{ display: "none" }} id="photo" onChange={e => uploadProfileImage(e)} />
                          </div>
                        </>
                      }
                      {/* <>
                           {prf.Image ?
                            <img src={prf.Image} alt="" />
                            :
                            <img src={Default} alt="" />
                          }
                        </> :
                        <>
                          {image ?
                            <img src={image} alt="" />
                            :
                            <img src={prf.Image} alt="" />
                          }
                          <div className='overlay'>
                            <label htmlFor="photo">
                              <i className="fa fa-camera"></i>
                            </label>
                            <input type="file" accept="image/" style={{ display: "none" }} id="photo" onChange={e => uploadProfileImage(e)} />
                          </div>
                        </> */}
                      {/* } */}

                    </div>

                    <div className="name">
                      {prf.name}
                    </div>
                    <div className="job">
                      Web Developer
                    </div>
                  </div>

                  <div className="sidenav-url">
                    <div className="url">
                      <a href="#profile" className="active">Profile</a>
                      <hr align="center" />
                    </div>
                    <div className="url">
                      <a href="#settings">Settings</a>
                      <hr align="center" />
                    </div>
                  </div>
                </div>

                <div className="main">
                  <h2>IDENTITY</h2>
                  <div className="card">
                    <i className="fa fa-pen fa-xs edit"></i>
                    <table>
                      <tr>
                        <td>Name</td>
                        <td>:</td>
                        {profileId === 0
                          ?
                          <td>{prf.name}</td>
                          :
                          <td><input type="text" name="name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} /></td>
                        }
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        {profileId === 0
                          ?
                          <td>{prf.email}</td>
                          :
                          <td><input type="text" name="name" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} /></td>
                        }
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>:</td>
                        {profileId === 0
                          ?
                          <td>{prf.phone_number}</td>
                          :
                          <td><input type="text" name="name" value={profile.phone_number} onChange={e => setProfile({ ...profile, phone_number: e.target.value })} /></td>
                        }
                      </tr>
                      <tr>
                        <div className="social-media">
                          <button className='btn-s' onClick={() => onSubmit(prf.id)}>save</button>
                        </div>
                      </tr>
                    </table>
                  </div>

                  <h2>EDIT MEDIA</h2>
                  <div className="card">
                    <div className="card-body">
                      <i className="fa fa-pen fa-xs edit"></i>
                      <div className="social-media">
                        <span className="fa-stack fa-sm">
                          {/* <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-facebook fa-stack-1x fa-inverse"></i> */}
                          <i className="fa fa-edit" onClick={() => profileSetId(prf.id)} />
                        </span>
                        {/* <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-invision fa-stack-1x fa-inverse"></i>
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                  </span>
                  <span className="fa-stack fa-sm">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                  </span> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div>
                </div> */}
              </>
              :
              <></>
            }
          </>
        )
      })}

    </>
  )
}

export default AddProfile
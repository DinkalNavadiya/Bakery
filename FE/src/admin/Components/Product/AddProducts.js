import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
// import { getProducts } from '../../../Graphql/Query';
// import { Add_Product, Update_Products } from '../../../Graphql/Mutation.js';
import moment from 'moment';
import { ItemContext } from '../../../Contexts/Context.js';
import Default from '/Users/vishal/Documents/Dinkal/bakery/FE/src/image/default.png';
import { getProducts, Add_Product, Update_Products } from '../../../Graphql/Product.js';
const AddItem = () => {
  const [item, setItem] = useState({
    name: "",
    weight: "",
    Dt_Mfg: "",
    Dt_Exp: "",
    price: "",
    image: ""
  })
  const { selectedId } = useContext(ItemContext)
  const [errors, setErrors] = useState([]);
  const { refetch } = useQuery(getProducts
    , {
      variables: { id: selectedId }, onCompleted:
        (data) => setItem(data.getProduct)
    }
  );

  const [addProducts] = useMutation(Add_Product, {
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    }
  });

  const [updateProducts] = useMutation(Update_Products);
  const [image, setImage] = useState('');
  const uploadProductImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.toString());
      };
      console.log(reader.readAsDataURL(file));
    }
    console.log("Base64::", image);
    if (file == null) {
      console.log("null");
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedId === 0) {
      let productInput = {
        // userId: UserData?.id,
        name: item.name,
        weight: item.weight,
        Dt_Mfg: item.Dt_Mfg,
        Dt_Exp: item.Dt_Exp,
        price: item.price,
        image: image
      }
      addProducts({
        variables: {
          productInput: productInput
        }
      }).then(() => {
        refetch();
      })
      setItem({
        name: "",
        Dt_Exp: "",
        Dt_Mfg: "",
        price: "",
        image: ""
      })
      window.location.reload();
    } else {
      updateProducts({
        variables: {
          id: selectedId,
          name: item.name,
          weight: item.weight,
          Dt_Mfg: item.Dt_Mfg,
          Dt_Exp: item.Dt_Exp,
          price: item.price,
          image: image
        }
      })
        .then(() => {
          refetch();
        })
      setItem({
        name: "",
        weight: "",
        Dt_Mfg: "",
        Dt_Exp: "",
        price: "",
        image: ""
      })
    }
  }
  const styles = {
    preview: {
      flexDirection: "column",
      maxWidth: "15%",
      marginLeft: "10%"
    },
    image: { maxWidth: "20%", maxHeight: 320, margin: "auto" },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
    },
  };
  const UserData = JSON.parse(localStorage.getItem("UserData"))

  return (
    <>
      <form className='add_item' onSubmit={onSubmit} key={item.id}>
        <input className="modal-btn" type="checkbox" id="modal-btn" name="modal-btn" />
        {UserData?.role === "admin" || UserData?.role === "superAdmin" ?
          <>
            <label htmlFor="modal-btn">
              {(selectedId === 0) ? 'Add' : 'Update'}
              <i className="uil uil-expand-arrows"></i>
            </label>
          </> : <></>
        }
        <div className="modal">
          <div className="modal-wrap">
            {/* {errors} */}
            <p> Name:</p>
            <input type="text" name='name' placeholder="enter product name" value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} />
            <br />
            <p> Weight:</p>
            <input type="Number" placeholder="enter product weight" value={item.weight} onChange={e => setItem({ ...item, weight: e.target.value })} />
            <br />
            <p>Manufacture Date:</p>
            <input type='date' placeholder="Manufacture Date" value={moment(item.Dt_Mfg).format("YYYY-MM-DD")} onChange={e => setItem({ ...item, Dt_Mfg: e.target.value })} /><br />
            <p>Expiry Date:</p>
            <input type='date' value={moment(item.Dt_Exp).format("YYYY-MM-DD")} onChange={e => setItem({ ...item, Dt_Exp: e.target.value })} /><br />
            <p>Price:</p>
            <input type='Number' placeholder='enter product price' value={item.price} onChange={e => setItem({ ...item, price: e.target.value })} /><br />
            <p>Image: &nbsp;
              <input type="file" accept="image/*" rel="icon" onChange={e => uploadProductImage(e)} />
            </p><br />
            {selectedId === 0
              ?
              <>
                {image ?
                  <img src={image} style={styles.preview} alt="" />
                  :
                  <img src={Default} style={styles.preview} alt="" />
                }
              </>
              :
              <>
                {image ?
                  <img src={image} style={styles.preview} value={item.image} onChange={e => setItem({ ...item, image: e.target.files[0] })} alt="" />
                  :
                  <img src={item.image} style={styles.preview} alt="" onChange={e => setItem({ ...item, image: e.target.files[0] })} />
                }
              </>
            }
            <br />
            <button type="submit" className='Add'>
              {(selectedId === 0) ? 'Add' : 'Update'}
            </button>
            <div className='error'>{
              errors.map(function (error) {
                return (
                  <h1>{error.message}</h1>
                )
              })
            }
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default AddItem
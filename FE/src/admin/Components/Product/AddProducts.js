import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { ItemContext } from '../../../Contexts/Context.js';
import Default from '../../../image/default.png';
import { getProducts, Add_Product, Update_Products } from '../../../Graphql/Product.js';
import { productStyle } from '../../../user/Components/Cart/style.js';
const AddItem = () => {
  const [item, setItem] = useState({
    name: "",
    weight: "",
    Dt_Mfg: "",
    Dt_Exp: "",
    price: "",
    image: ""
  })
  const { selectedId, setSelectedId } = useContext(ItemContext)
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
  const [load, setLoad] = useState(false);
  const uploadProductImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
    if (file == null) {
      console.log("null");
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedId === 0) {
      setLoad(true)
      let productInput = {
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
        setTimeout(() => {
          setLoad(false)
        }, 1000)
      })
      setItem({
        name: "",
        weight: "",
        Dt_Exp: "",
        Dt_Mfg: "",
        price: "",
        image: ""
      })
    } else {
      setLoad(true)
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
          setTimeout(() => {
            setLoad(false)
            setSelectedId(0)
          }, 1000)
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

  const UserData = JSON.parse(localStorage.getItem("UserData"))
  if (load) return <div className='loader'></div>;
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
                  <img src={image} style={productStyle.preview} alt="" />
                  :
                  <img src={Default} style={productStyle.preview} alt="" />
                }
              </>
              :
              <>
                {image ?
                  <img src={image} style={productStyle.preview} value={item.image} onChange={e => setItem({ ...item, image: e.target.files[0] })} alt="" />
                  :
                  <img src={item.image} style={productStyle.preview} alt="" onChange={e => setItem({ ...item, image: e.target.files[0] })} />
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
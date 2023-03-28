import { useState } from 'react'
import { toast } from 'react-toastify';


export const useForm = (callback, initialState) => {

  const [values, setValues] = useState(initialState);
  const [pass, setPass] = useState(initialState);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const valueChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password === pass.confirmPassword) {
      toast("Success")
      callback();
    } if (values.password !== pass.confirmPassword) {
      toast("Password Mismatch")
    }
  };
  const onLoginSubmit = () => {
    callback();

  }

  return {
    onChange,
    onSubmit,
    values,
    valueChange,
    onLoginSubmit
  };
}

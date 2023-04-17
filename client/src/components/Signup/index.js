import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Signup = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    moneyboi: false,
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "moneyboi") {
      value = parseInt(value);
      value === 1 ? (value = true) : (value = false);
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });
      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main container-form">
        <button className="container-close" type="button" onClick={handleClose}>
          X
        </button>

        <div className="container-text">
          <h1 className="modal-text">Sign up</h1>
          <form onSubmit={handleFormSubmit}>
            <input className="form-input" placeholder="Your username" name="name" type="text" value={formState.name} onChange={handleChange} />
            <input className="form-input" placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
            <input className="form-input" placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
            {/* <label className='checkbox'> Are you a moneyboi?</label>
                <select className="moneyboi" onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option> */}
            {/* </select> */}
            <button className="btn btn-block btn-info" style={{ cursor: "pointer" }} type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Signup;

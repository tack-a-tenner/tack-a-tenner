import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, TextField, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";

const UpdateRequest = ({ show, handleClose, handleSubmit, request }) => {
  const [formData, setFormData] = useState({
    requestTitle: request.requestTitle,
    description: request.description,
    price: request.price,
    isActive: request.isActive,
    expirationDate: request.expirationDate,
  });
  const [updateRequest] = useMutation(UPDATE_REQUEST);
  const navigate = useNavigate();

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "price") {
      value = parseInt(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    if (name === "isActive") {
      setFormData({ ...formData, isActive: event.target.checked });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateRequest({
        variables: {
          requestId: request._id,
          ...formData,
        },
      });
      handleClose();
      handleSubmit(data.updateRequest);
      setFormData({
        requestTitle: "",
        description: "",
        price: 0,
      });
      navigate("/me");
    } catch (err) {
      console.error(err);
    }
  };

  const { isActive, expirationDate, requestTitle, description, price } = formData;

  return (
    <Modal open={show} onClose={handleClose}>
      <div className="modal-main-request conatainer-form">
        <button className="container-close" type="button" onClick={handleClose}>
          X
        </button>
        <div className="container-text">
          <h2 className="modal-text">Update request</h2>
          <form onSubmit={handleFormSubmit}>
            <input className="form-input" placeholder="Request Title" name="requestTitle" type="text" value={requestTitle} onChange={handleChange} />

            <input className="form-input" placeholder="Description" name="description" type="text" value={description} onChange={handleChange} />
            <input className="form-input" placeholder="Price" name="price" value={price} onChange={handleChange} />

            {/* <TextField
              label="Expiration date"
              name="expirationDate"
              type="date"
              value={expirationDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
            <FormControlLabel control={<Checkbox checked={isActive} onChange={handleCheckboxChange} name="isActive" color="primary" />} label="Is active" />
            <Button className="btn btn-block btn-info" type="submit">
              Update Request
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

UpdateRequest.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
};

export default UpdateRequest;

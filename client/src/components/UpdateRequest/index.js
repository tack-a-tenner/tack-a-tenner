import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, TextField, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { UPDATE_REQUEST } from "../../utils/mutations";

const UpdateRequestForm = ({ show, handleClose, handleSubmit, request }) => {
  const [formData, setFormData] = useState({
    requestTitle: request.requestTitle,
    description: request.description,
    price: request.price,
    isActive: request.isActive,
    expirationDate: request.expirationDate,
  });
  const [updateRequest] = useMutation(UPDATE_REQUEST);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
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
        isActive: true,
        expirationDate: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div style={{ backgroundColor: "white", padding: 16 }}>
        <h2>Update request</h2>
        <form onSubmit={handleFormSubmit}>
          <TextField label="Request title" name="requestTitle" value={formData.requestTitle} onChange={handleChange} fullWidth required margin="normal" />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth required margin="normal" />
          <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth required margin="normal" />
          <TextField
            label="Expiration date"
            name="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel control={<Checkbox checked={formData.isActive} onChange={handleCheckboxChange} name="isActive" color="primary" />} label="Is active" />
          <Button variant="contained" color="primary" type="submit">
            Update Request
          </Button>
        </form>
      </div>
    </Modal>
  );
};

UpdateRequestForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
};

export default UpdateRequestForm;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, TextField, Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { ADD_REQUEST } from "../../utils/mutations";
import dateFormat from "../../utils/dateFormat";

const RequestForm = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    requestTitle: "",
    description: "",
    price: 0,
    expirationDate: "",
  });
  const [addRequest] = useMutation(ADD_REQUEST);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addRequest({
        variables: {
          requestTitle: formData.requestTitle,
          description: formData.description,
          price: Number(formData.price),
          isActive: true, // Assuming all new requests are active by default
          ...(formData.expirationDate && { expirationDate: dateFormat(formData.expirationDate) }),
        },
      });
      handleClose();
      handleSubmit(data.addRequest);
      setFormData({
        requestTitle: "",
        description: "",
        price: 0,
        expirationDate: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div style={{ backgroundColor: "white", padding: 16 }}>
        <h2>Create a new request</h2>
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
          <Button variant="contained" color="primary" type="submit">
            Create Request
          </Button>
        </form>
      </div>
    </Modal>
  );
};

RequestForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default RequestForm;

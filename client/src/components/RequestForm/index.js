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
      const isoExpirationDate = formData.expirationDate ? new Date(formData.expirationDate) : "";

      const { data } = await addRequest({
        variables: {
          requestTitle: formData.requestTitle,
          description: formData.description,
          price: Number(formData.price),
          isActive: true,
          ...(isoExpirationDate && { expirationDate: isoExpirationDate }),
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
      window.location.reload(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <div className="modal-main-request conatainer-form">
        <button className="container-close" type="button" onClick={handleClose}>
          X
        </button>
        <div className="container-text">
          <h2 className="modal-text">Create A Request</h2>
          <form>
            <input className="form-input" placeholder="Request Title" name="requestTitle" type="text" value={formData.requestTitle} onChange={handleChange} />

            <input className="form-input" placeholder="Description" name="description" type="text" value={formData.description} onChange={handleChange} />
            <input className="form-input" placeholder="Price" name="price" value={formData.price} onChange={handleChange} />

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
            <Button className="btn btn-block btn-info" type="submit" onClick={handleFormSubmit}>
              Create Request
            </Button>
          </form>
        </div>
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

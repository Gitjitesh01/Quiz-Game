import React, { useState } from "react";
import swal from "sweetalert";

import FlashMessage from "react-flash-message";
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../../constants/apiUrl";

export function DiscountForm({ open, onClose }) {
  const [formData, setFormData] = useState({
    code: "",
    type: "",
    value: "",
    validFrom: "",
    validTo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl + "discount", formData);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-discount-form"
      aria-describedby="add-discount-form-description"
    >
      <Box sx={style}>
        <h2 className="mb-2 text-center text-3xl font-bold">
          Create New Coupon
        </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="fixed">Fixed</MenuItem>
              <MenuItem value="flat">Flat</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Value"
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Valid From"
            name="validFrom"
            type="date"
            value={formData.validFrom}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Valid To"
            name="validTo"
            type="date"
            value={formData.validTo}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="bg-sky-700 font-bold text-white"
            >
              Submit
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              className="bg-gray-700 font-bold text-white"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

import React, { useState, useEffect } from "react";
import swal from "sweetalert";
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
import { baseUrl,discount, subscription , } from "../../../../constants/apiUrl";

export function DiscountForm({ open, onClose, selectedRow }) {
  const [allSubscriptionPage, setAllSubscriptionPage] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    type: "",
    value: "",
    applyTo: "",
    promoType:"",
    validFrom: "",
    validTo: "",
  });

  const getSubscriptionName = () => {
    axios
      .get(baseUrl + subscription.getAllSubscription)
      .then((res) => {
        setAllSubscriptionPage(res.data.data.map((item) => item.subscriptionName));
      })
      .catch((error) => {
        console.error("There was an error fetching the subscription names!", error);
      });
  };

  useEffect(() => {
    getSubscriptionName();
    if (selectedRow) {
      setFormData({
        code: selectedRow.code || "",
        type: selectedRow.type || "",
        value: selectedRow.value || "",
        applyTo: selectedRow.applyTo || "",
        validFrom: selectedRow.validFrom || "",
        validTo: selectedRow.validTo || "",
      });
    }
  }, [selectedRow]);

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
      if (selectedRow?._id) {
        const response = await axios.post(baseUrl + discount.editBannerByID + selectedRow._id, formData);
        console.log(response.data);
      } else {
        const response = await axios.post(baseUrl + discount.createDiscount, formData);
        console.log(response.data);
      }
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
        <h2 className="mb-2 text-center text-3xl font-bold">Create New Coupon</h2>
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
              className="flex flex-col justify-start w-full"
            >
              {/* <div > */}
              <MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="fixed">Fixed</MenuItem>
              <MenuItem value="flat">Flat</MenuItem>
              {/* </div> */}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>promo Type</InputLabel>
            <Select
              name="promoType"
              value={formData.promoType}
              onChange={handleChange}
              required
              className="flex flex-col justify-start w-full"
            >
              {/* <div > */}
              <MenuItem value="discount">discount</MenuItem>
              <MenuItem value="coupon">coupon</MenuItem>
              {/* </div> */}
            </Select>
          </FormControl>
          <FormControl fullWidth className="">
  <label>Apply To</label>
  <div onChange={handleChange} className="flex justify-start items-center gap-3 flex-wrap">
    {allSubscriptionPage.map((item, index) => (
      <label key={index}>
        <input
          type="radio"
          name="applyTo"
          value={item}
          checked={formData.applyTo === item}
          required
        />
        {item}
      </label>
    ))}
    <label>
      <input
        type="radio"
        name="applyTo"
        value="all"
        checked={formData.applyTo === "all"}
        required
      />
      all
    </label>
  </div>
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
            >
              Submit
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

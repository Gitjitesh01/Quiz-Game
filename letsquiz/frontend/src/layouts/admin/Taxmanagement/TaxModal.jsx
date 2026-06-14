import React, { useEffect } from "react";
import swal from "sweetalert";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import axios from "axios";
import { baseUrl, tax } from "../../../constants/apiUrl";
import { useTheme } from "@mui/material/styles";

export function TaxModal({ open, onClose, inputData }) {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      taxName: "",
      taxPercentage: "",
      isActive: false,
      taxType: "",
      taxDescription: "",
    },
  });

  useEffect(() => {
    if (inputData) {
      reset({
        taxName: inputData?.taxName || "",
        taxPercentage: inputData?.taxPercentage || "",
        isActive: inputData?.isActive || false,
        taxType: inputData?.taxType || "",
        taxDescription: inputData?.taxDescription || "",
      });
    }
  }, [inputData, reset]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (inputData?._id) {
        const response = await axios.post(
          `${baseUrl}edittax/${inputData._id}`,
          data
        );
        console.log(response.data);
        swal("Success", "Tax updated successfully!", "success");
      } else {
        data.taxId = data.taxName.toLowerCase().split(" ").join("");
        const response = await axios.post(baseUrl + tax.createTax, data);
        console.log(response.data);
        swal("Success", "Tax created successfully!", "success");
      }
      onClose();
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      swal("Error", "There was an error submitting the form!", "error");
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    p: 4,
    borderRadius: 2,
  };

  const buttonStyle = {
    fontWeight: "bold",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="tax-form"
      aria-describedby="tax-form-description"
    >
      <Box sx={modalStyle}>
        <h2 className="mb-2 text-center text-3xl font-bold">
          {inputData?._id ? "Update Tax" : "Create New Tax"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Tax Name"
            name="taxName"
            {...control.register("taxName", {
              required: "Tax Name is required",
            })}
            error={!!errors.taxName}
            helperText={errors.taxName?.message}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tax Percentage"
            name="taxPercentage"
            type="number"
            {...control.register("taxPercentage", {
              required: "Tax Percentage is required",
              valueAsNumber: true,
              validate: value => value > 0 || "Tax Percentage must be positive",
            })}
            error={!!errors.taxPercentage}
            helperText={errors.taxPercentage?.message}
            required
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Tax Type"
            name="taxType"
            {...control.register("taxType", {
              required: "Tax Type is required",
            })}
            error={!!errors.taxType}
            helperText={errors.taxType?.message}
            required
            fullWidth
            margin="normal"
          /> */}
            <Controller
            name="taxType"
            control={control}
            render={({ field }) => (
              <TextField
              select
              label="Tax Type"
              {...field}
              SelectProps={{
                native: true,
              }}
              fullWidth
              margin="normal"
              error={!!errors.taxType}
              helperText={errors.taxType?.message}
              >
              <option value="" disabled>
                Select Tax Type
              </option>
              <option value="GST">GST</option>
              <option value="Service Tax">Service Tax</option>
              </TextField>
            )}
            />
          <TextField
            label="Tax Description"
            name="taxDescription"
            {...control.register("taxDescription")}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch {...field} checked={field.value} color="primary" />
                )}
              />
            }
            label="Is Active"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={buttonStyle}
            >
              Submit
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              sx={buttonStyle}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

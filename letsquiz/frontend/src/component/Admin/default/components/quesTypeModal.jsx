import React from "react";
import swal from "sweetalert";

("react");
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
import { baseUrl, QUIZ } from "../../../../constants/apiUrl";

export function QuesTypeModal({ open, onClose, inputData }) {
  console.log(inputData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: inputData?.name || "",
      isActive: inputData?.isActive || false,
    },
  });



  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (inputData?._id) {
        const response = await axios.post(
          `${baseUrl}/edit-grade/${inputData._id}`,
          data
        );
        console.log(response.data);
      } else {
        data.value = data.name.toLowerCase().split(" ").join("");
        const response = await axios.post(baseUrl + "grade", data);
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
      aria-labelledby="add-subscription-form"
      aria-describedby="add-subscription-form-description"
    >
      <Box sx={style}>
        <h2 className="mb-2 text-center text-3xl font-bold">
          Create New Gr
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Grade Name"
            name="name"
            {...control.register("name", {
              required: "Grade Name is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            required
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
              className="bg-sky-700 font-bold text-white"
            >
              Submit
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              className="font-bold text-gray-700"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

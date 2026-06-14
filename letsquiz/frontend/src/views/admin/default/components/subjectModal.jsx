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
import { baseUrl } from "../../../../constants/apiUrl";

export function SubjectModal({ open, onClose, inputData }) {
  console.log(inputData);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      url: "",
      isActive: false,
    },
  });

  useEffect(() => {
    reset({
      name: inputData?.name || "",
      url: inputData?.url || "",
      isActive: inputData?.isActive || false,
    });
  }, [inputData, reset]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (inputData?._id) {
        console.log(data);
        const response = await axios.post(
          baseUrl + "subject/" + inputData._id,
          data
        );
      } else {
        data.value = data.name.toLowerCase().split(" ").join("");
        const response = await axios.post(baseUrl + "subject", data);
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
          Create New Subject
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Subject Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Subject Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                required
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="url"
            control={control}
            rules={{ required: "Subject Icon is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Subject Icon"
                error={!!errors.url}
                helperText={errors.url?.message}
                required
                fullWidth
                margin="normal"
              />
            )}
          />
          <FormControlLabel
            control={
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value}
                    color="primary"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#1976d2",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#1976d2",
                        },
                    }}
                  />
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

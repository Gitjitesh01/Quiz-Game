import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { baseUrl } from "../../../../constants/apiUrl";

export function BannerModal({ open, onClose, inputData }) {
  console.log(inputData);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      image: "",
      isActive: false,
    },
  });

  useEffect(() => {
    reset({
      title: inputData?.title || "",
      image: inputData?.image || "",
      isActive: inputData?.isActive || false,
    });
  }, [inputData, reset]);

  const onSubmit = async (data) => {
    try {
      console.log(data);

      if (inputData?._id) {
        const response = await axios.post(
          baseUrl + "banner/" + inputData._id,
          data
        );
        console.log(response.data);
      } else {
        const formData = new FormData();
        formData.append("title", data.title);
        if (selectedImage) {
          formData.append("image", selectedImage);
        }

        const uploadResponse = await axios.post(baseUrl + "banner", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        data.image = uploadResponse.data.imageUrl;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setImageName(file.name);
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
      aria-labelledby="add-banner-form"
      aria-describedby="add-banner-form-description"
    >
      <Box sx={style}>
        <h2 className="mb-2 text-center text-3xl font-bold">
          Create New Banner
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Banner title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Banner title"
                error={!!errors.title}
                helperText={errors.title?.message}
                required
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            rules={{ required: "Banner image is required" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  type="file"
                  onChange={(e) => {
                    field.onChange(e);
                    handleImageChange(e);
                  }}
                  error={!!errors.image}
                  required
                  fullWidth
                  margin="normal"
                  inputProps={{ accept: "image/*" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton component="label">
                        <PhotoCamera />
                        <input
                          type="file"
                          hidden
                          onChange={(e) => {
                            field.onChange(e);
                            handleImageChange(e);
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {imageName && (
                  <TextField
                    value={imageName}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                )}
              </>
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

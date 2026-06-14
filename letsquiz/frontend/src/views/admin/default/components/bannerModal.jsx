import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { baseUrl } from "../../../../constants/apiUrl";

export function BannerModal({ open, onClose, inputData }) {
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
      relatedlink: "",
      isActive: false,
    },
  });

  useEffect(() => {
    reset({
      title: inputData?.title || "",
      image: inputData?.image || "",
      relatedlink: inputData?.relatedlink || "",
      isActive: inputData?.isActive || false,
    });
  }, [inputData, reset]);

  const onSubmit = async (data) => {
    try {
      if (inputData?._id) {
        const response = await axios.post(
          baseUrl + "editbanner/" + inputData._id,
          data
        );
        console.log(response.data);
        onClose();
      } else {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("relatedlink", data.relatedlink);
        if (selectedImage) {
          formData.append("image", selectedImage);
        }

        const uploadResponse = await axios.post(baseUrl + "banner", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        data.image = uploadResponse.data.imageUrl;
        onClose();
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
            name="relatedlink"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Related Link"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    color="primary"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#1976d2",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#1976d2",
                      },
                    }}
                  />
                }
                label="Is Active"
              />
            )}
          />
          <Box>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {imageName && (
              <TextField
                value={imageName}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            )}
          </Box>
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

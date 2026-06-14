import React, { useEffect, useMemo } from "react";
import CardMenu from "../../../../component/card/CardMenu";
import Checkbox from "../../../../component/checkbox";
import Card from "../../../../component/card";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const CheckTable = (props) => {
  
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-navy-700 text-xl font-bold dark:text-white">
          Check Table
        </div>

        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="dark:!border-navy-700 border-b border-gray-200 pb-[10px] pr-16 text-start"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      data = (
                        <div className="flex items-center gap-2">
                          <Checkbox />
                          <p className="text-navy-700 text-sm font-bold dark:text-white">
                            {cell.value[0]}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = (
                        <div className="flex items-center">
                          <p className="text-navy-700 text-sm font-bold dark:text-white">
                            {cell.value}%
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "QUANTITY") {
                      data = (
                        <p className="text-navy-700 text-sm font-bold dark:text-white">
                          {" "}
                          {cell.value}{" "}
                        </p>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <p className="text-navy-700 text-sm font-bold dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pb-[16px] pt-[14px] sm:text-[14px]"
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CheckTable;

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

export function SubscriptionFormModal({ open, onClose, inputData }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subscriptionName: "",
      amount: "",
      description: "",
      mcq: false,
      fillups: false,
      truefalse: false,
      matching: false,
      draganddrop: false,
      shortanswer: false,
      dropdown: false,
      checkbox: false,
      date: false,
      email: false,
      poll: false,
      wordcloud: false,
      imageInQuestions: false,
      audioInQuestions: false,
      videoInQuestions: false,
      certificates: false,
      certificateTemplates: false,
      ownCertificateTemplate: false,
      createPaidQuizzes: false,
      isActive: false,
    },
  });

  useEffect(() => {
    reset({
      subscriptionName: inputData?.subscriptionName || "",
      amount: inputData?.price || 0,
      description: inputData?.description || "",
      mcq: inputData?.mcq || false,
      fillups: inputData?.fillups || false,
      truefalse: inputData?.truefalse || false,
      matching: inputData?.matching || false,
      draganddrop: inputData?.draganddrop || false,
      shortanswer: inputData?.shortanswer || false,
      dropdown: inputData?.dropdown || false,
      checkbox: inputData?.checkbox || false,
      date: inputData?.date || false,
      email: inputData?.email || false,
      poll: inputData?.poll || false,
      wordcloud: inputData?.wordcloud || false,
      imageInQuestions: inputData?.imageInQuestions || false,
      audioInQuestions: inputData?.audioInQuestions || false,
      videoInQuestions: inputData?.videoInQuestions || false,
      certificates: inputData?.certificates || false,
      certificateTemplates: inputData?.certificateTemplates || false,
      ownCertificateTemplate: inputData?.ownCertificateTemplate || false,
      createPaidQuizzes: inputData?.createPaidQuizzes || false,
      isActive: inputData?.isActive || false,
    });
  }, [inputData, reset]);

  //todo: Add the form submission logic

  const onSubmit = async (data) => {
    try {
      console.log(typeof(data));
      if (inputData?._id) {
        const response = await axios.post(
          baseUrl + "editsubscription/" + inputData._id,
          data
        );
        onClose();
        console.log(response.data);
      } else {
        await axios.post(
          'https://letsquiz.org/api/subscription-create',
          JSON.stringify(data), // Directly send `data` as the payload
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
        onClose(); // Close the form or do whatever is needed after submission
      }
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
          Create New Subscription
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Subscription Name"
            name="subscriptionName"
            {...control.register("subscriptionName", {
              required: "Subscription Name is required",
            })}
            error={!!errors.subscriptionName}
            helperText={errors.subscriptionName?.message}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="amount"
            type="number"
            {...control.register("amount", { required: "Price is required" })}
            error={!!errors.price}
            helperText={errors.price?.message}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            {...control.register("description", {
              required: "Description is required",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            required
            fullWidth
            margin="normal"
          />
          {[
            "mcq",
            "fillups",
            "truefalse",
            "matching",
            "draganddrop",
            "shortanswer",
            "dropdown",
            "checkbox",
            "date",
            "email",
            "poll",
            "wordcloud",
            "imageInQuestions",
            "audioInQuestions",
            "videoInQuestions",
            "certificates",
            "certificateTemplates",
            "ownCertificateTemplate",
            "createPaidQuizzes",
            "isActive",
          ].map((field, index) => (
            <FormControlLabel
              key={index}
              control={
                <Controller
                  name={field}
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
              label={field.split(/(?=[A-Z])/).join(" ")} // Split camelCase to separate words
            />
          ))}
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


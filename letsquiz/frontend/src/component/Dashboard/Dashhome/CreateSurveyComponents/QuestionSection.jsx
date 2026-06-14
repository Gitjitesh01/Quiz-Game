import React from "react";
import swal from "sweetalert";

("react");
import { AiFillDelete } from "react-icons/ai";
import { TiDelete, TiTick } from "react-icons/ti";

function QuestionSection(props) {
  // const [questions, setQuestions] = useState([
  //     {
  //         title: "",
  //         type: "",
  //         options: [{
  //             text: "",
  //             id: 1,
  //             image: "",
  //             audio: "",
  //             video: "",
  //             selection: "",
  // }],
  //         answer_options: [{
  //             text: 3,
  //             image: "",
  //             audio: "",
  //             video: "",
  //             selection: "",
  // }],
  //         timer: "",
  //         selectedTimer: {
  //             code: 12000,
  //             name: "12 Seconds",
  //         },
  //         points: 4,
  //         cumpolsory: true,
  //     }
  // ]);

  const questionType = {
    mcq: (
      <>
        {props?.questions[props.index].options.map((singleMcq, index) => {
          return (
            // <>
            <div id="mcqOption1" className="my-2 flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                  placeholder="Add an option here"
                  value={singleMcq.text}
                  onChange={(e) => {
                    let temp = [...props.questions];
                    temp[props.index].options[index].text = e.target.value;
                    temp[props.index].options[index].id = index + 1;
                    props.setQuestions(temp);
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className={`ml-2 p-2.5 text-sm font-medium text-white ${
                  props.questions[props.index].answer_options[0].text ==
                  index + 1
                    ? "bg-green-500"
                    : "bg-[#1D4ED8] "
                } rounded-lg border  duration-200 hover:bg-green-500 focus:outline-none focus:ring-0`}
                onClick={() => {
                  if (
                    props.questions[props.index].answer_options[0].text ==
                    index + 1
                  ) {
                    let temp = [...props.questions];
                    temp[props.index].answer_options[0].text = "";
                    props.setQuestions(temp);
                    return;
                  }
                  let temp = [...props.questions];
                  temp[props.index].answer_options[0].text = index + 1;
                  props.setQuestions(temp);
                }}
              >
                <TiTick />
                <span className="sr-only">Search</span>
              </button>
              <button
                type="submit"
                className="ml-2 rounded-lg border border-red-500 bg-red-700 p-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300  "
                onClick={() => {
                  if(props.questions[props.index].options.length == 1){
                    swal("Error", "Atleast One option is required", "error");
                    return;
                  }
                  let temp = [...props.questions];
                  temp[props.index].options.splice(index, 1);
                  temp[props.index].answer_options.splice(index, 1);
                  props.setQuestions(temp);
                }}
              >
                <TiDelete />
                <span className="sr-only">Delete</span>
              </button>
            </div>
            // {/* <div id="mcqOption2" className="flex items-center my-2">
            //     <div className="relative w-full">
            //         <input
            //             type="text"
            //             id="simple-search"
            //             className="bg-[#53FF45] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   "
            //             placeholder="Add an option here"
            //             required
            //         />
            //     </div>
            //     <button
            //         type="submit"
            //         className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300  "
            //     >
            //         <TiTick />
            //         <span className="sr-only">Search</span>
            //     </button>
            // </div> */}
            // </>
          );
        })}
        <button
          className="block w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={() => {
            let temp = [...props.questions];
            temp[props.index].options.push({
              text: "",
              id: temp[props.index].options.length + 1,
              image: "",
              audio: "",
              video: "",
              selection: "",
            });
            temp[props.index].answer_options.push({
              text: "",
              image: "",
              audio: "",
              video: "",
              selection: "",
            });
            props.setQuestions(temp);
          }}
        >
          Add Answer Option
        </button>
      </>
    ),
    fillups: (
      <>
        <div className="my-2 flex w-full flex-col items-center justify-around gap-2">
          <p>TYPE THE ANSWER AS CORRECT,IF IT</p>
          {props.questions[props.index].options.map((singleFillup, index) => {
            return (
              <div className="flex w-full justify-around gap-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="simple-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                    placeholder="Add your answer"
                    value={
                      props.questions[props.index].answer_options[index].text
                    }
                    onChange={(e) => {
                      let temp = [...props.questions];
                      temp[props.index].answer_options[index].text =
                        e.target.value;
                      props.setQuestions(temp);
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className=" rounded-lg border border-blue-700 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
                >
                  <select
                    id="countries"
                    className="block w-full min-w-max rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
                    value={
                      props.questions[props.index].answer_options[index].text
                    }
                    onChange={(e) => {
                      let temp = [...props.questions];
                      temp[props.index].answer_options[index].selection =
                        e.target.value;
                      props.setQuestions(temp);
                    }}
                  >
                    <option
                      value="contains"
                      className="bg-gray-50 text-black"
                      selected
                    >
                      Contains
                    </option>
                    <option value="exact" className="bg-gray-50 text-black">
                      Exactly
                    </option>
                  </select>
                </button>

                <AiFillDelete
                  size={"1.4rem"}
                  className="cursor-pointer self-center hover:text-red-500"
                  onClick={() => {
                    if(props.questions[props.index].options.length == 1){
                      swal("Error", "Atleast One option is required", "error");
                      return;
                    }
                    let temp = [...props.questions];
                    temp[props.index].options.splice(index, 1);
                    temp[props.index].answer_options.splice(index, 1);
                    props.setQuestions(temp);
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={() => {
            let temp = [...props.questions];
            temp[props.index].options.push({
              text: "",
              id: temp[props.index].options.length + 1,
              image: "",
              audio: "",
              video: "",
              selection: "",
            });
            temp[props.index].answer_options.push({
              text: "",
              image: "",
              audio: "",
              video: "",
              selection: "",
            });
            props.setQuestions(temp);
          }}
        >
          Add Alternative
        </button>
      </>
    ),
    truefalse: (
      <>
        <div className="mb-4 flex items-center">
          <input
            id="default-radio-1"
            type="radio"
            value=""
            name="truefalse-radio"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            checked={
              props.questions[props.index].answer_options[0].text.toString() ==
              "true"
            }
            onChange={() => {
              let temp = [...props.questions];
              temp[props.index].answer_options[0].text = true;
              props.setQuestions(temp);
            }}
          />
          <label
            htmlFor="default-radio-1"
            className="ml-2 text-sm font-medium text-gray-900    "
          >
            True
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked={
              props.questions[props.index].answer_options[0].text.toString() ==
              "false"
            }
            onChange={() => {
              let temp = [...props.questions];
              temp[props.index].answer_options[0].text = false;
              props.setQuestions(temp);
            }}
            id="default-radio-2"
            type="radio"
            value=""
            name="truefalse-radio"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="default-radio-2"
            className="ml-2 text-sm font-medium text-gray-900    "
          >
            False
          </label>
        </div>
      </>
    ),
    matching: (
      <>
        <div className="mb-4 flex flex-col items-center">
          {props.questions[props.index].options.map((singleMatch, index) => {
            return (
              <div className="my-2 flex">
                <input
                  type="text"
                  id="voice-search"
                  className="mx-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                  placeholder="your option"
                  value={singleMatch.text}
                  onChange={(e) => {
                    let temp = [...props.questions];
                    temp[props.index].options[index].text = e.target.value;
                    props.setQuestions(temp);
                  }}
                  required
                />
                <input
                  type="text"
                  id="voice-search"
                  className="mx-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                  placeholder="your answer"
                  required
                  value={props.questions[props.index].options[index].selection}
                  onChange={(e) => {
                    let temp = [...props.questions];
                    temp[props.index].options[index].selection = e.target.value;
                    props.setQuestions(temp);
                  }}
                />
                <div className="flex items-center justify-center">
                  <AiFillDelete
                    size={"1rem"}
                    onClick={() => {
                      if(props.questions[props.index].options.length == 1){
                        swal("Error", "Atleast One option is required", "error");
                        return;
                      }
                      let temp = [...props.questions];
                      temp[props.index].options.splice(index, 1);
                      props.setQuestions(temp);
                    }}
                  />
                </div>
              </div>
            );
          })}
          <button
            className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
            onClick={() => {
              let temp = [...props.questions];
              temp[props.index].options.push({
                text: "",
                id: temp[props.index].options.length + 1,
                image: "",
                audio: "",
                video: "",
                selection: "",
              });
              temp[props.index].answer_options.push({
                text: "",
                image: "",
                audio: "",
                video: "",
                selection: "",
              });
              props.setQuestions(temp);
            }}
          >
            Add Answer Option
          </button>
        </div>
      </>
    ),
    shortanswer: (
      <>
        {props.questions[props.index].options.map((singleMatch, index) => {
          return (
            <div className="my-2 flex w-full flex-col  items-center justify-around">
              <p>TYPE THE ANSWER AS CORRECT,IF IT</p>
              <div className="flex w-full justify-around gap-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="simple-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                    placeholder="Add your answer"
                    required
                    value={
                      props.questions[props.index].answer_options[index].text
                    }
                    onChange={(e) => {
                      let temp = [...props.questions];
                      temp[props.index].answer_options[index].text =
                        e.target.value;
                      props.setQuestions(temp);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className=" rounded-lg border border-blue-700 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  "
                >
                  <select
                    id="countries"
                    className="block w-fit rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500  "
                    value={
                      props.questions[props.index].answer_options[index]
                        .selection
                    }
                    onChange={(e) => {
                      let temp = [...props.questions];
                      temp[props.index].answer_options[index].selection =
                        e.target.value;
                      props.setQuestions(temp);
                    }}
                  >
                    <option
                      value="contains"
                      className="bg-gray-50 text-black"
                      selected
                    >
                      Contains
                    </option>
                    <option value="excatly" className="bg-gray-50 text-black">
                      Exactly
                    </option>
                  </select>
                </button>
                <AiFillDelete
                  size={"1.4rem"}
                  className="cursor-pointer self-center hover:text-red-500"
                  onClick={() => {
                    if(props.questions[props.index].options.length == 1){
                      swal("Error", "Atleast One option is required", "error");
                      return;
                    }
                    let temp = [...props.questions];
                    temp[props.index].options.splice(index, 1);
                    temp[props.index].answer_options.splice(index, 1);
                    props.setQuestions(temp);
                  }}
                />
              </div>
            </div>
          );
        })}
        {/* 
                <button
                    className="w-fit bg-[#1D4ED8] text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    onClick={()=>{
                        let temp = [...props.questions];
                        temp[props.index].options.push({
                            text: "",
                            id: temp[props.index].options.length+1,
                            image: "",
                            audio: "",
                            video: "",
                            selection: "",
                        });
                        temp[props.index].answer_options.push({
                            text: "",
                            image: "",
                            audio: "",
                            video: "",
                            selection: "",
                        });
                        props.setQuestions(temp);
                    }}
                >
                    Add Alternative
                </button> */}
      </>
    ),
    checkbox: (
      <>
        <div className="my-2 flex w-full flex-col  items-center justify-around">
          {props.questions[props.index].options.map((singleMcq, index) => {
            return (
              <div className="my-1 flex w-full items-center justify-around">
                <div className="m-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    name=""
                    id=""
                    onClick={() => {
                      let temp = [...props.questions];
                      temp[props.index].answer_options[index].text =
                        temp[props.index].options[index].id;
                      props.setQuestions(temp);
                      console.log(props.questions);
                    }}
                    checked={
                      props.questions[props.index].answer_options[index].text ==
                      singleMcq.id
                    }
                  />
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="simple-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                    placeholder="Add your answer"
                    required
                    value={singleMcq.text}
                    onChange={(e) => {
                      let temp = [...props.questions];
                      temp[props.index].options[index].text = e.target.value;
                      temp[props.index].options[index].id = index + 1;
                      props.setQuestions(temp);
                    }}
                  />
                </div>
                <div>
                  <AiFillDelete
                    size={"1.4rem"}
                    onClick={() => {
                      if(props.questions[props.index].options.length == 1){
                        swal("Error", "Atleast One option is required", "error");
                        return;
                      }
                      let temp = [...props.questions];
                      temp[props.index].options.splice(index, 1);
                      temp[props.index].answer_options.splice(index, 1);
                      props.setQuestions(temp);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={() => {
            let temp = [...props.questions];
            temp[props.index].options.push({
              text: "",
              id: temp[props.index].options.length + 1,
              image: "",
              audio: "",
              video: "",
              selection: "",
            });
            temp[props.index].answer_options.push({
              text: "",
              image: "",
              audio: "",
              video: "",
              selection: "",
            });
            props.setQuestions(temp);
          }}
        >
          Add Answer Option
        </button>
      </>
    ),
    dropdown: (
      <>
        {props.questions[props.index].options.map((singleMcq, index) => {
          return (
            <div className="my-2 flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
                  placeholder="Add your answer"
                  required
                  value={singleMcq.text}
                  onChange={(e) => {
                    let temp = [...props.questions];
                    temp[props.index].options[index].text = e.target.value;
                    temp[props.index].options[index].id = index + 1;
                    props.setQuestions(temp);
                  }}
                />
              </div>
              <button
                type="submit"
                className={`ml-2 p-2.5 text-sm font-medium text-white ${
                  props.questions[props.index].answer_options[0].text ==
                  singleMcq.id
                    ? "bg-green-500"
                    : "bg-[#1D4ED8] "
                } rounded-lg border  duration-200 hover:bg-green-500 focus:outline-none focus:ring-0`}
                onClick={() => {
                  let temp = [...props.questions];
                  temp[props.index].answer_options[0].text = index + 1;
                  props.setQuestions(temp);
                }}
              >
                <TiTick />
                <span className="sr-only">Search</span>
              </button>

              <button
                type="submit"
                className="ml-2 rounded-lg border border-red-500 bg-red-500 p-2 text-lg font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  "
                onClick={() => {
                  if(props.questions[props.index].options.length == 1){
                    swal("Error", "Atleast One option is required", "error");
                    return;
                  }
                  let temp = [...props.questions];
                  temp[props.index].options.splice(index, 1);
                  temp[props.index].answer_options.splice(index, 1);
                  props.setQuestions(temp);
                }}
              >
                <TiDelete />
                <span className="sr-only">Delete</span>
              </button>
            </div>
          );
        })}
        <button
          className="block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500  "
          onClick={() => {
            let temp = [...props.questions];
            temp[props.index].options.push({
              text: "",
              id: temp[props.index].options.length + 1,
              image: "",
              audio: "",
              video: "",
              selection: "",
            });
            temp[props.index].answer_options.push({
              text: "",
              image: "",
              audio: "",
              video: "",
              selection: "",
            });
            props.setQuestions(temp);
          }}
        >
          Add Answer Option
        </button>
      </>
    ),
    date: (
      <>
        <input
          type="date"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Select date"
        />
      </>
    ),
    email: (
      <>
        <input
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
          placeholder="Your Email"
          type="text"
        />
      </>
    ),
    rating: <></>,
    // wordcloud: (
    //   <>
    //     <div className="flex flex-col">
    //       <div>
    //         <h2 className="text-xl font-bold">Words</h2>
    //         {props.questions[props.index].options.map((singleMcq, index) => {
    //           return (
    //             <div className="relative flex w-full">
    //               <input
    //                 type="text"
    //                 id="simple-search"
    //                 className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   "
    //                 placeholder="Add your answer"
    //                 required
    //                 value={singleMcq.text}
    //                 onChange={(e) => {
    //                   let temp = [...props.questions];
    //                   temp[props.index].options[index].text = e.target.value;
    //                   temp[props.index].options[index].id = index + 1;
    //                   props.setQuestions(temp);
    //                 }}
    //               />
    //               <button
    //                 type="submit"
    //                 className={`ml-2 rounded-lg border border-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
    //                   props.questions[props.index].answer_options[index].text ==
    //                   singleMcq.id
    //                     ? "bg-[#0067B6]"
    //                     : "bg-blue-600"
    //                 }`}
    //                 onClick={() => {
    //                   let temp = [...props.questions];
    //                   temp[props.index].answer_options[index].text = index + 1;
    //                   props.setQuestions(temp);
    //                 }}
    //               >
    //                 <TiTick />
    //                 <span className="sr-only">Search</span>
    //               </button>
    //               <button
    //                 type="button"
    //                 className="ml-2 rounded-lg border border-red-500 bg-red-500 p-2 text-lg font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  "
    //                 onClick={() => {
    //                   let temp = [...props.questions];
    //                   temp[props.index].options.splice(index, 1);
    //                   temp[props.index].answer_options.splice(index, 1);
    //                   props.setQuestions(temp);
    //                 }}
    //               >
    //                 <TiDelete />
    //                 <span className="sr-only">Delete</span>
    //               </button>
    //             </div>
    //           );
    //         })}
    //       </div>

    //       <button
    //         className="my-2 block w-fit w-full rounded-lg border border-gray-300 bg-[#1D4ED8] p-2.5 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500"
    //         onClick={() => {
    //           let temp = [...props.questions];
    //           temp[props.index].options.push({
    //             text: "",
    //             id: temp[props.index].options.length + 1,
    //             image: "",
    //             audio: "",
    //             video: "",
    //             selection: "",
    //           });
    //           temp[props.index].answer_options.push({
    //             text: "",
    //             image: "",
    //             audio: "",
    //             video: "",
    //             selection: "",
    //           });
    //           props.setQuestions(temp);
    //         }}
    //       >
    //         Add Words
    //       </button>
    //       {/* <div>
    //                 <h2 className="text-xl font-bold">Answers</h2>
    //                 <div className="relative w-full flex">
    //                     <input
    //                         type="text"
    //                         id="simple-search"
    //                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   "
    //                         placeholder="Add your answer"
    //                         required
    //                     />
    //                     <button
    //                         type="submit"
    //                         className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  "
    //                     >
    //                         <TiTick />
    //                         <span className="sr-only">Search</span>
    //                     </button>
    //                 </div>
    //             </div>
    //             <button className="w-fit my-2 bg-[#1D4ED8] text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ">Add Answers</button> */}
    //     </div>
    //   </>
    // ),
    test: (
      <textarea
        id="message"
        rows="4"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
        placeholder="Write your thoughts here..."
      ></textarea>
    ),
  };

  return questionType[props.type];
}

QuestionSection.propTypes = {
  type:
    "mcq" |
    "fillups" |
    "truefalse" |
    "matching" |
    "shortanswer" |
    "checkebox" |
    "dropdown" |
    "date" |
    "email" |
    "rating" |
    "wordcloud" |
    "test",
  index: Number,
  setQuestions: Function,
  questions: Array,
};

export default QuestionSection;

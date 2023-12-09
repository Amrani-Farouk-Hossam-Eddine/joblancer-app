import React, { useReducer, useState } from "react";
import { INTIAL_STATE, gigReducer } from "../reducers/gigReducer";
import upload from "../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INTIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutaion = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("myGigs");
    },
  });
  console.log(state);
  const handleSubmit = (e) => {
    e.preventDefault();
    mutaion.mutate(state);
    // navigate("/myGigs");
  };
  return (
    <div className="flex justify-center py-10">
      <div className="w-[1200px]">
        <h1 className="text-3xl text-gray-500 pb-5">Add New Gig</h1>
        <div className="flex justify-center gap-14">
          <div className="flex flex-col gap-12 flex-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-gray-500">
                Title
              </label>
              <input
                type="text"
                name="title"
                id=""
                placeholder="e.g. I will do somthing i'm really good at"
                className="border border-gray-300 p-3"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-gray-500">
                Category
              </label>
              <select
                name="cat"
                id="cat"
                className="border border-gray-300 p-3"
                onChange={handleChange}
              >
                <option value="Design">Design</option>
                <option value="Web">Web</option>
                <option value="AI">AI</option>
              </select>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex  gap-4">
                <div className="flex flex-col gap-3 text-gray-500">
                  <label htmlFor="">Cover Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="text-sm"
                    onChange={(e) => setSingleFile(e.target.files[0])}
                  />
                </div>
                <div className="flex flex-col gap-3 text-gray-500">
                  <label htmlFor="">Upload Images</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    multiple
                    className="text-sm"
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
              </div>
              <button
                className="bg-blue-500 text-white p-3"
                onClick={handleUpload}
              >
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-gray-500">
                Description
              </label>
              <textarea
                name="desc"
                id=""
                cols="30"
                rows="10"
                className="border border-gray-300 p-3"
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              className="bg-blue-500 text-white py-3 w-full"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-gray-500">
                Service Title
              </label>
              <input
                type="text"
                name="shortTitle"
                id=""
                placeholder="e.g. One page web design"
                className="border border-gray-300 p-3"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className="text-gray-500">
                Description
              </label>
              <textarea
                name="shortDesc"
                id=""
                cols="30"
                rows="10"
                className="border border-gray-300 p-3"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-gray-500">
                Delivery Time{"("}e.g. 3 days{")"}
              </label>
              <input
                type="number"
                name="deliveryTime"
                id=""
                placeholder="e.g. One page web design"
                className="border border-gray-300 p-3"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-gray-500">
                Revision Number
              </label>
              <input
                type="number"
                name="revisionNumber"
                id=""
                placeholder="e.g. One page web design"
                className="border border-gray-300 p-3"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-gray-500">
                Add Features
              </label>
              <form
                onSubmit={handleFeature}
                className="m-0 flex flex-col gap-5"
              >
                <input
                  type="text"
                  name="features"
                  id=""
                  placeholder="e.g. One page web design"
                  className="border border-gray-300 p-3 w-full"
                />
                <button type="submit" className="p-3 bg-blue-500 text-white">
                  add
                </button>
              </form>
              <div className="flex gap-5">
                {state?.features?.map((f) => (
                  <div key={f}>
                    <button
                      className="text-sm bg-transparent text-red-500"
                      onClick={() =>
                        dispatch({ type: "DELETE_FEATURE", payload: f })
                      }
                    >
                      {f} <span>X</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-gray-500">
                Price
              </label>
              <input
                type="number"
                name="price"
                id=""
                className="border border-gray-300 p-3"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;

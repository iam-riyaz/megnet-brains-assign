import { useEffect, useState } from "react";
import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";

import { firebaseStorage } from "../config/firebase.config.js";
import axios from "axios";
import { Card } from "./Card.jsx";

export const DragAndDrop = () => {
  const [fileData, setFileData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleGetData = async () => {
    const data = await axios.get("http://localhost:3000/files/getFiles");

    setUserData(data.data);
  };

  const handleChange = async (e) => {
    setFileData(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    setIsUploading(true);
    // To Upload image to firebase storage----------
    const pictureData = fileData;

    const storageRef = ref(
      firebaseStorage,
      `/megnet_brains/${Date.now() + pictureData.name}`
    );
    const uploadBtyesVariable = await uploadBytes(storageRef, pictureData);
    const downloadUrl = await getDownloadURL(uploadBtyesVariable.ref);

    // ----
    alert("🎉🎉 File Uploaded Successfully");

    console.log(downloadUrl);
    setFileData(null);
    const sendObject = {
      fileName: fileData.name,
      src: downloadUrl,
      size: fileData.size,
      mineType: fileData.type,
    };
    axios
      .post("http://localhost:3000/files/create", sendObject)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    handleGetData();
    setIsUploading(false);
    console.log(downloadUrl);
  };

  const handleDelete = async (_id) => {
    const deleteFile = await axios.delete(
      "http://localhost:3000/files/delete",
      { _id: _id }
    );
    // handleGetData()
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          className={fileData ? "bg-purple-100" : "bg-gray-100"}
          class={
            fileData
              ? "flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-100 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-green-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              : "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          }
        >
          <div class="flex flex-col items-center justify-center pt-6 pb-6">
            <svg
              class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to Select</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              JPEG, JPG, PNG or GIF
            </p>
          </div>
          {fileData ? (
            <div className="flex jusifiy-center items-center">
              <p className="pr-3">{fileData.name}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="18"
                height="18"
                viewBox="0 0 26 26"
              >
                <path d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z"></path>
              </svg>
            </div>
          ) : null}
          <input
            accept="image/jpeg, image/png , image/jpg, image/gif"
            style={{ marginTop: "-120px" }}
            id="dropzone-file"
            onChange={handleChange}
            type="file"
            class="cursor-pointer relative  opacity-0 w-full h-full p-20 z-500"
          />
        </label>
      </div>
      <div>
        {fileData ? (
          <div>
            <button
              onClick={handleUpload}
              className="bg-purple-500 py-3 w-1/5 mt-4 mx-3 rounded-lg text-white text-xl font-semibold"
            >
              {isUploading == true ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-6 h-6 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#8b00c2"
                  />
                </svg>
              ) : null}
              {isUploading == false ? "Upload" : "Uploading"}
            </button>
            <button
              onClick={() => {
                setFileData(null);
                setIsUploading(false)
              }}
              className="bg-red-500 py-3 w-1/5 mt-4 mx-3 rounded-lg text-white text-xl font-semibold"
            >
              Cencel
            </button>
          </div>
        ) : (
          <div>
            <button
              disabled
              className="bg-purple-500 py-3 w-1/5 mt-4 mx-3 rounded-lg text-white text-xl font-semibold opacity-40"
            >
              Upload
            </button>
            <button
              disabled
              className="bg-red-500 py-3 w-1/5 mt-4 mx-3 rounded-lg text-white text-xl font-semibold opacity-40"
            >
              Cencel
            </button>
          </div>
        )}
      </div>
      {userData.length!=0?<div className="flex flex-wrap   ">
        {userData.map((e, i) => {
          return  <Card key={i + 1} handleGetData={handleGetData} data={e} />
        })}
      </div>:<div className="flex justify-center pt-10"> <img className="w-1/4" src="/empty.jpg" alt="" /> </div>}
    </>
  );
};

import axios from "axios";

export const Card = ({ data,handleGetData}) => {

  const truncatedFileName = data.fileName.length > 10 ? data.fileName.substring(0, 10) + '...' : data.fileName;
  const handleDownload = async ( {imageUrl} ) => {

    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'downloaded_image.jpg'; // Specify a default filename if not provided
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDelete= async (_id)=>{
    console.log({_id})
    const deleteFile= await axios.delete("http://localhost:3000/files/delete",{data:{_id}})
    console.log({deleteFile})
    const confirmDelete= window.confirm("Are you sure you want to delete")

    if(confirmDelete)
    {
      handleGetData()

    }
    
  }

  return (
    <>
      <div class="w-72 my-5 mx-5 max-w-sm bg-white border border-gray-400 rounded-lg shadow hover:shadow-2xl cursor-pointer">
        <div className="w-full p-4 h-48 flex justify-center">
          <img class="rounded-lg h-full" src={data.src} alt="" />
        </div>
        <div class="p-4">
          <p class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {truncatedFileName}
          </p>

          <div className="flex justify-around pb-3">
          <p class="mb-1 text-xs text-gray-700 dark:text-gray-400">
            <span className="font-bold text-xs">Type:</span> {data.mineType}
          </p>
          <p class="mb-1 text-xs text-gray-700 dark:text-gray-400">
          <span className="font-bold text-xs"> Size:</span> {Math.floor((data.size)/1000)} Kb
          </p>
          </div>
          <div className="flex justify-between ">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={data.src}
              download={"new-file.jpg"}
            >
              <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View
              </button>
            </a>
              <button onClick={()=>{ const imageUrl=data.src; handleDownload({imageUrl})}} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Download
              </button>
            

            <button onClick={()=>handleDelete(data._id)} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

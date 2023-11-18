export const Card = ({data}) => {
    console.log(data)
  return (
    <>
      <div class="w-full  mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full h-48 flex justify-center">
          <img
            class="rounded-t-lg h-full"
            src={data.src}
            alt=""
          />
        </div>
        <div class="p-2">
          <p class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
             {data.fileName}
          </p>

          <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
            Type: {data.mineType}
          </p>
          <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
            Size: {data.size} bytes
          </p>
          <div className="flex justify-between ">
            <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              View
            </button>
            <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Download
            </button>
            <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Card = (fileData) => {
  return (
    <>
      <div class="w-1/5  mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full h-48 flex justify-center">
          <img
            class="rounded-t-lg h-full"
            src="https://firebasestorage.googleapis.com/v0/b/r-instagram.appspot.com/o/megnet_brains%2F1700329252998NEW%20PIC.jpg?alt=media&token=ee6582d1-c96c-4ebd-b4e3-dc4d8ab5bdab"
            alt=""
          />
        </div>
        <div class="p-2">
          <p class="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            file name
          </p>

          <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
            type:jpeg
          </p>
          <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
            size:39309 bytes
          </p>
          <div className="flex justify-between">
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

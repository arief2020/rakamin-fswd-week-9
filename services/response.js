const successResponse = (data, message = "Success") => {
  return {
    message: message,
    data: data,
  };
};
const paginationResponse = (data, message = "Success", page, total_pages, total_results) => {
  return {
    message: message,
    data: data,
    page: 1,
    total_pages: 5,
    total_results: 50,
  };
};

// Function to generate an error response
const basicResponse = (message) => {
  return {
    message: message,
  };
};

module.exports = {
  successResponse,
  basicResponse,
};


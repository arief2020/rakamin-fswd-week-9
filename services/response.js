const successResponse = (data, message = "Success") => {
  return {
    message: message,
    data: data,
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

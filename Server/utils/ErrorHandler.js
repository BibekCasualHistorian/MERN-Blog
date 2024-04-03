const ErrorHandler = async (status, message) => {
  const error = new Error();
  error.statusCode = status;
  error.message = message;
  return error;
};

module.exports = ErrorHandler;

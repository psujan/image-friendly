const apiResponse = {
  success: (
    res,
    data = null,
    message = "Action Successful",
    statusCode = 200
  ) => {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
    });
  },
  error: (
    res,
    message = "Something went wrong",
    statusCode = 500,
    data = null
  ) => {
    return res.status(statusCode).json({
      success: false,
      data,
      message,
    });
  },
};

export default apiResponse;

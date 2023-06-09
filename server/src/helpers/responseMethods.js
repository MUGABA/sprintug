/*
 *@param {res Express Response} object
 *@param{ statusCode } http response code
 *@param {message} string
 */
export const ErrorResponse = (res, statusCode, message, error) => {
  return res.status(statusCode).send({
    error: message,
  });
};

/*
 *@param {res Express Response} object
 *@param{ statusCode } http response code
 *@param {message} string
 *@param{ data } any response data
 */
export const SuccessResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).send({
    status: statusCode,
    message,
    data,
  });
};

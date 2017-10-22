function error_400(res) {
  return res.status(400).json({
    '_response_info' : {
      'status': 'bad request',
      'status_message': 'Bad Request'
    }
  });
} // error_400

module.exports = error_400;

const apiRequest = async (url = "", obj = null, errMsg = null) => {
  try {
    const response = await fetch(url, obj);
    if (!response.ok) throw Error("Not Recived");
  } catch (err) {
    errMsg = err.Message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;

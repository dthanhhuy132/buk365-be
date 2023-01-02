export const successSendData = (code, data, res, success = true) => {
  return res.status(code).json({ success, code, data });
};

export const successSendMessage = (code, message, res, success = true) => {
  return res.status(code).json({ success, code, message });
};

export const errorsSendMessage = (code, message, res, success = false) => {
  return res.status(code).json({ success, code, message });
};

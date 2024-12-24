export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const extractIdFromOver = (str) => {
  const match = str.match(/drop-area-(.+)/);
  return match ? match[1] : null;
};

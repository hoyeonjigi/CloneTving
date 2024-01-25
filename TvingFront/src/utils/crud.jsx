import axios from "axios";

const getData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error in getData: ${error}`);
    throw error;
  }
};

const postData = async (url, data, headers) => {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error in postData: ${error}`);
    throw error;
  }
};

const putData = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error in putData: ${error}`);
    throw error;
  }
};

const deleteData = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(`Error in deleteData: ${error}`);
    throw error;
  }
};

export { getData, postData, putData, deleteData };

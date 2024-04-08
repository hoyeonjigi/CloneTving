import axios from "axios";

const getData = async (url, headers) => {
	try {
		const response = await axios.get(url, { headers });
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

const deleteData = async (url, headers) => {
	try {
		const response = await axios.delete(url, { headers });
		return response.data;
	} catch (error) {
		console.error(`Error in deleteData: ${error}`);
		throw error;
	}
};

const patchData = async (url, data, headers) => {
	// Patch 요청을 위한 함수, credentials 옵션 포함
	try {
		const response = await axios.patch(url, data, {
			headers,
			withCredentials: true, // 여기에 credentials 옵션 추가
		});
		return response.data;
	} catch (error) {
		console.error(`Error in patchData: ${error}`);
		throw error;
	}
};

export { getData, postData, putData, deleteData, patchData };

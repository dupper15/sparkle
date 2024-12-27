import axios from "axios";

export const createProject = async (id, data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/project/${id}/create`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const getDetailProject = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/project/get-detail/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const getAllProject = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/project/getAll/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const getAllTeamProject = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/project/get-teamProject/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const getPublic = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/project/get-projectPublic`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const updateProject = async (id, data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY}/project/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const addProject = async (id, data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY}/project/add-project/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const updatePublic = async (id) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY}/project/update-public/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const updatePrivate = async (id) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY}/project/update-private/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const addEditor = async (projectId, email) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY}/project/${projectId}/add-editor`,
      { email }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};
export const getAvatar = async (usersInRoom) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/project/get-avatar`,
      { usersInRoom }
    );

    return response.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || "API call failed");
  }
};

export const downloadProject = async (id, data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/project/download/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const renameProject = async (id, projectName) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY}/project/rename-project/${id}`,
      { projectName }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/project/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const getEditor = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/project/get-editor/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const removeEditor = async (data) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/project/remove-editor/${data.id}`, {data}
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

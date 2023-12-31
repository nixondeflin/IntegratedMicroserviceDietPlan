import { useState, useEffect, useCallback } from "react";
import axios from "axios"; 
import config from "../config";

const useContent = () => {
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("tokenCore");

  const [data, setData] = useState("temp");
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(
        config.coreApiUrl + "customers/" + username,
        { headers }
      );
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("Error in GET request:", error);
      setError(error);
    }
  },[token,username]);

  useEffect(() => {
    fetchData();
  }, [fetchData, username]);

  const postData = async (url, formData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(url, formData, { headers });
      console.log("Form submitted successfully:", response.data);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error submitting form:", error);
      return { success: false, error };
    }
  };

  const updateData = async (url, formData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    console.log(formData);
    formData["Customer_ID"] = data["Customer_ID"];
    console.log(formData);

    try {
      const response = await axios.put(url + username, formData, { headers });
      console.log("Data updated successfully:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating data:", error);
      return { success: false, error };
    }
  };

  const deleteData = async (url) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.delete(url, { headers });
      setData("temp");
      console.log("Data deleted successfully:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error deleting data:", error);
      return { success: false, error };
    }
  };



  return {
    data,
    error,
    token,
    username,
    postData,
    fetchData,
    deleteData,
    updateData,
  };
};

export default useContent;
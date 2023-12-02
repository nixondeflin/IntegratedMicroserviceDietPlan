import { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import config from "../config";

const useDiet = () => {
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token1");

  const [data, setData] = useState("temp");
  const [dataDiet, setDataDiet] = useState("temp");
  console.log(dataDiet);
  const [dataDietRec, setDataDietRec] = useState("temp");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    fetchDietRecommendation();
    fetchDataDiet();
  }, [token, username]);

  useEffect(() => {
    fetchData();
    fetchDietRecommendation();
    fetchDataDiet();
  }, []);

  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(config.dietApiUrl + "user/" + username, {
        headers: headers,
      });

      const data = response.data;
      setData(data);
    } catch (error) {
      console.error("Error in GET request:", error);
      setError(error);
    }
  };

  const fetchDataDiet = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(config.dietApiUrl + "calculate_calories/" + username, {
        headers: headers,
      });

      const dataDiet = response.data;
      console.log(dataDiet);
      setDataDiet(dataDiet);
    } catch (error) {
      console.error("Error in GET request:", error);
      setError(error);
    }
  };

  const postData = async (url, formData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log(formData);
    try {
      const response = await axios.post(url, formData, { headers });
      console.log("Form submitted successfully:", response.data);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error submitting form:", error);
      return { success: false, error };
    }
  };

  const postDataDiet = async (url, formData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log(formData);
    try {
      const response = await axios.post(url, formData, { headers });
      console.log("Form submitted successfully:", response.data);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error submitting form:", error);
      return { success: false, error };
    }
  };

  console.log(dataDiet);

  const updateData = async (url, formData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

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

  const fetchDietRecommendation = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(
        config.dietApiUrl + "diet_recommendation",
        {
          headers: headers,
        }
      );

      const data = response.data;
      setDataDietRec(data);
    } catch (error) {
      console.error("Error in GET request:", error);
      setError(error);
    }
  };

  return {
    data,
    dataDietRec,
    error,
    token,
    username,
    postData,
    fetchData,
    fetchDietRecommendation,
    fetchDataDiet,
    deleteData,
    updateData,
    dataDiet,
    postDataDiet,
  };
};




export default useDiet;
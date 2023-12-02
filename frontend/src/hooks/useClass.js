import { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import config from "../config";

const useClass = () => {
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token2");

  const [data, setData] = useState("temp");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [token, username]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get(config.gymApiUrl + "classes", {
        headers: headers,
      });

      // console.log("GET request successful:");
      const data = response.data;
      setData(data);
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

  const updateData = async (url, formData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log("asdasd");
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

  const postLoanRecommendation = async (loanData) => {
    const url = config.gymApiUrl + "recommend_loan/" + username;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log("asd");

    try {
      const response = await axios.post(url, loanData, { headers });
      console.log("Loan recommendation submitted successfully:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error submitting loan recommendation:", error);
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

export default useClass;
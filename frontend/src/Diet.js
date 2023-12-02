import React, { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
import useContent from "./hooks/useContents";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import config from "./config";
import { NavLink, useLocation } from "react-router-dom";
import DietProfile from "./components/DietProfile";
import DietUserForm from "./components/DietUserForm";
import useDiet from "./hooks/useDiet";
import DietPlanDisplay from "./components/DisplayDietPlan";

function generateUniqueId() {
  // Generate a unique ID using the current timestamp and a random number
  const timestamp = new Date().getTime().toString(16);
  const random = Math.random().toString(16).slice(2); // Remove '0.' from the beginning

  // Concatenate the timestamp and random number
  const uniqueId = timestamp + random;

  return uniqueId;
}

const Diet = () => {
  const { data, username, postData, postDataDiet, fetchData, fetchDataDiet,dataDiet, updateData, deleteData, error } =
    useDiet();
  const { username: usernameP } = useContent();

  const [dietrec,setDietRec] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    user_id: username,
    name: "",
    weight_kg: 0,
    height_cm: 0,
    age: 0,
    gender: "Male",
    activity_level: "Moderate",
    goal: "Weight_Loss",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e, isUpdate = false) => {
    e.preventDefault();

    let result,result2;
    if (isUpdate) {
      // If it's an update, use the updateData function
      result = await updateData(config.dietApiUrl + `user/`, formData);
    } else {
      // If it's a post, use the postData function
      console.log(formData);
      const {name,...formData2}=formData;
      result = await postData(config.dietApiUrl + "user", formData);
      console.log(formData2);
      result2 = await postDataDiet(config.dietApiUrl + "calculate_calories", formData2);
      console.log(result2);
      setDietRec(result2.data);

      console.log(formData2);
    }

    if (result.success) {
      // Optionally, you can redirect or perform additional actions after successful submission
      await fetchData(config.dietApiUrl + "user/" + formData.Username);
    } else {
      console.error("Error submitting form:", result.error);
    }
  };

  const handleCalculator = async () => {
    const { name, ...formData2 } = formData;
    let result2;
    result2 = await postDataDiet(config.dietApiUrl + "calculate_calories", formData2);
    console.log(result2);
    setDietRec(result2.data);
  }

  const handleDelete = async () => {
    const result = await deleteData(config.dietApiUrl + "user/" + username);

    if (result.success) {
      // Data deleted successfully, you can handle the result.data if needed
      console.log("Data deleted successfully:", result.data);
    } else {
      // Error occurred during deletion, handle the error
      console.error("Error deleting data:", result.error);
    }
  };

  return (
    <>
      <main className="content" >
        <p className="headingM" style= {{textAlign: 'left'}}><b>User : {usernameP}</b></p>

        <p style= {{textAlign: 'left'}}>Apabila hasil kalkulator kalori terdapat hasil negatif, <br/>isikan kembali data Anda dalam tombol Edit, lalu tekan tombol Nutrition Analysis.</p>

        {data && (
          <>
            {data["user_id"] ? (
              <>
                <DietProfile data={data} />
                <Button
                  colorScheme="whatsapp"
                  margin="4"
                  width="5rem"
                  onClick={onOpen}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="whatsapp"
                  width="5rem"
                  margin="4"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  colorScheme="whatsapp"
                  width="10rem"
                  margin="4"
                  onClick={handleCalculator}
                >
                  Nutrition Calculator
                </Button>
                <Button colorScheme="whatsapp" width="5rem" margin="4">
                  <NavLink to="/home" activeclassname="active">Home</NavLink>
                </Button>
              </>
            ) : (
              <div>
                <h1 className="headingL" >Form</h1>
                <DietUserForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isUpdate={false}
                />
              </div>
            )}
          </>
        )}
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <DietUserForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isUpdate={true}
                  onClose={onClose}
                />
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </>
        {dietrec &&
          <DietPlanDisplay
          username={username}
          randomDiet={dietrec}
        />
        }
      </main>
    </>
  );
};

export default Diet;
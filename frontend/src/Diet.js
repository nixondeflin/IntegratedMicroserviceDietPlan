import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
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
  Box,
  Text
} from "@chakra-ui/react";
import config from "./config";
import { NavLink } from "react-router-dom";
import NutritionProfile from "./components/NutritionProfile";
import NutritionUserForm from "./components/NutritionUserForm";
import useDiet from "./hooks/useDiet";
import DisplayNutrition from "./components/DisplayNutrition";


const Diet = () => {
  const { data, username, postData, postDataDiet, fetchData,  updateData, deleteData } =
    useDiet();


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
        <Box as='button' borderRadius='md' bg='#25D366' position='absolute' top ='0' left ='0' color='white' px={4} h={8} ><b>User : {username}</b></Box>
        <br></br>
        <Text textAlign='left'>Apabila hasil kalkulator kalori terdapat hasil negatif, <br/>isikan kembali data Anda dalam tombol Edit, lalu tekan tombol Nutrition Analysis.</Text>
      
        {data && (
          <>
            {data["user_id"] ? (
              <>
                <NutritionProfile data={data} />
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
                <NutritionUserForm
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
                <NutritionUserForm
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
          <DisplayNutrition
          username={username}
          randomDiet={dietrec}
        />
        }
      </main>
    </>
  );
};

export default Diet;
import React from "react";
import {
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { NavLink} from "react-router-dom";

const NutritionUserForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isUpdate,
  onClose,
}) => {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <form onSubmit={(e) => handleSubmit(e, isUpdate)}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Your name"
            name="name"
            value={formData.name}
            onChange={(event) =>
              handleInputChange({
                target: { name: "name", value: event.target.value },
              })
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Weight (kg)</FormLabel>
          <NumberInput
            name="weight_kg"
            value={formData.weight_kg}
            min={0}
            max={120}
            onChange={(_, value) =>
              handleInputChange({ target: { name: "weight_kg", value } })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Height (cm)</FormLabel>
          <NumberInput
            name="height_cm"
            value={formData.height_cm}
            min={0}
            max={220}
            onChange={(_, value) =>
              handleInputChange({ target: { name: "height_cm", value } })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Age</FormLabel>
          <NumberInput
            name="age"
            value={formData.age}
            min={0}
            max={100}
            onChange={(_, value) =>
              handleInputChange({ target: { name: "age", value } })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Activity Level</FormLabel>
          <Select
            name="activity_level"
            value={formData.activity_level}
            onChange={handleInputChange}
          >
            <option value="Sedentary">Sedentary</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Active">Active</option>
            <option value="Extremely_Active">Extremely_Active</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Goal</FormLabel>
          <Select
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
          >
            <option value="Weight_Loss">Weight_Loss</option>
            <option value="Weight_Gain">Weight_Gain</option>
            <option value="Maintenance">Maintenance</option>
          </Select>
        </FormControl>

        <Button colorScheme="whatsapp" margin="4" type="submit" onClick={onClose}>
          Submit
        </Button>

        <Button colorScheme="whatsapp" width="5rem" margin="4">
              <NavLink to="/home" activeclassname="active">Home</NavLink>
        </Button>
      </form>
    </div>
  );
};

export default NutritionUserForm;
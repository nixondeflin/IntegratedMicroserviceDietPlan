import React from "react";
import { Heading } from "@chakra-ui/react";
import {
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const DisplayNutrition = ({ username, randomDiet }) => {
  
return (
  <Table variant="simple" size="lg">
    <TableCaption placement="top">
      <Heading fontSize="xl">{`${username}'s Nutrition Calculator`}</Heading>
    </TableCaption>
    <Thead>
      <Tr>
        <Th style={cellStyle1}>Metric</Th>
        <Th style={cellStyle1}>Value</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td style={cellStyle1}>Calories per Day</Td>
        <Td style={cellStyle1}>{randomDiet.calories_per_day}</Td>
      </Tr>
      <Tr>
        <Td style={cellStyle1}>Protein per Day</Td>
        <Td style={cellStyle1}>{`${randomDiet.protein_grams_per_day} grams`}</Td>
      </Tr>
      <Tr>
        <Td style={cellStyle1}>Carbohydrates per Day</Td>
        <Td style={cellStyle1}>{`${randomDiet.carbohydrate_grams_per_day} grams`}</Td>
      </Tr>
      <Tr>
        <Td style={cellStyle1}>Fat per Day</Td>
        <Td style={cellStyle1}>{`${randomDiet.fat_grams_per_day} grams`}</Td>
      </Tr>
      <Tr>
        <Td style={cellStyle1}>Fiber per Day</Td>
        <Td style={cellStyle1}>{`${randomDiet.fiber_grams_per_day} grams`}</Td>
      </Tr>
    </Tbody>
  </Table>
);
}

const cellStyle1 = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export default DisplayNutrition;
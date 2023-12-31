import React from "react";
import useClass from "./hooks/useClass";
import useContent from "./hooks/useContents";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {Box} from "@chakra-ui/react";

const Class = () => {

  const { data } = useClass();
  const { username } = useContent();

  const handleJoinClick = (classId) => {
    // Add your logic for handling the "JOIN" button click
    alert(`User ${username} joined Class ID ${classId}`);
  };

  return (
    <>
    <Box as='button' borderRadius='md' bg='#25D366' position='absolute' top ='0' left ='0' color='white' px={4} h={8} ><b>User : {username}</b></Box>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 className="headingL">Sports Classes</h1>
        {data[0]["class_id"] && (
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={headerCellStyle}>No</th>
                  <th style={headerCellStyle}>Class Type</th>
                  <th style={headerCellStyle}>Start Time</th>
                  <th style={headerCellStyle}>End Time</th>
                  <th style={headerCellStyle}>Join Class</th> 
                </tr>
              </thead>
              <tbody>
                {data.map((classInfo) => (
                  <tr key={classInfo.class_id}>
                    <td style={cellStyle}>{classInfo.class_id}</td>
                    <td style={cellStyle}>{classInfo.class_type}</td>
                    <td style={cellStyle}>{classInfo.start_time}</td>
                    <td style={cellStyle}>{classInfo.end_time}</td>
                    <td style={cellStyle}>
                      <Button colorScheme="whatsapp" width="5rem" margin="4" onClick={() => handleJoinClick(classInfo.class_id)}>Join</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button colorScheme="whatsapp" width="5rem" margin="4">
              <NavLink to="/home" activeclassname="active">Home</NavLink>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px", // Adjust as needed
};

const headerCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  background: "#22C35E",
  color: 'white'
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

export default Class;
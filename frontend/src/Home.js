// Home.js
import React from 'react';
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Text
        bgGradient='linear(to-l, #22C35E, #68FB4B)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
      >
        Health Hub Service
      </Text>
      <section>
        <Text >
        Health Hub adalah platform kesehatan komprehensif yang menggabungkan secara menyeluruh rekomendasi diet personal
        <br />
        dan pelatihan kebugaran untuk memberdayakan pengguna dalam perjalanan menuju kesehatan yang lebih baik. 
        </Text>
      </section>
      <section>
        <ul>
        <header className="flex">
      <nav>
        <ul className="primary-nav">
          <li>
            <Button colorScheme="whatsapp"
                  width="10rem"
                  margin="4">
              <NavLink to="/home" exact="true" activeclassname="active">
                Home
              </NavLink>
            </Button>
          <Button colorScheme="whatsapp"
                  width="12rem"
                  margin="4">
              <NavLink to="/diet" activeclassname="active">
                Nutrition Analysis
              </NavLink>
            </Button>
          <Button colorScheme="whatsapp"
                  width="16rem"
                  margin="4">
              <NavLink to="/class" activeclassname="active">
                Class Course Recommendation
              </NavLink>
            </Button>
          <Button colorScheme="whatsapp"
                  width="10rem"
                  margin="4">
              <NavLink to="/" activeclassname="active">
                Sign Out
              </NavLink>
          </Button>
          </li>
        </ul>
      </nav>
    </header>
        </ul>
      </section>
    </div>
  );
};

export default Home;
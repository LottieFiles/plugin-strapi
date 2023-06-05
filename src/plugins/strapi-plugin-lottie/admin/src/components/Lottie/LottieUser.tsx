import React, { useContext } from "react";
import { Avatar, Box, Typography } from '@strapi/design-system';
import { LottieContext } from "../../context/lottie-provider";

import styled from "styled-components";

const LottieUserContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  gap: 1rem;
  padding: 1rem;
`;


const LottieUser = () => {
  const { onLogout, userData } = useContext(LottieContext);
  if (!userData.name) return null
  return (
    <LottieUserContainer>
      <Box style={{
        display: 'flex',
        gap: '8px',
      }}>
        <Box>
          <Avatar src={userData.avatarUrl} alt={userData.name} preview />
        </Box>
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Typography varian="pi" fontWeight="700">
            {userData.name}
          </Typography>
          <Typography varian="pi" style={{ fontSize: '10px', color: "#63727E" }}>
            {userData.email}
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box style={{
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}>
          <Typography varian="pi" style={{ color: '#63727E', cursor: 'pointer' }}  onClick={() => window.open(`https://lottiefiles.com${userData.username ?? ""}`, "_blank")} >
            View profile
          </Typography>
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.52931 1.58813H2.17644C1.52671 1.58813 1 2.11484 1 2.76457V9.82319C1 10.4729 1.52671 10.9996 2.17644 10.9996H9.23506C9.88479 10.9996 10.4115 10.4729 10.4115 9.82319V7.47032" stroke="#63727E" stroke-linecap="round" />
            <path d="M8.05859 1H11.5879V4.52931" stroke="#63727E" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.9995 1.58795L3.94089 8.05835" stroke="#63727E" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Box>

        <Box>
          <Typography varian="pi" style={{ color: '#63727E', cursor: 'pointer' }} onClick={() => onLogout()}>
            Logout
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box>
          <Typography varian="pi" style={{ color: "#A1ADB7", fontSize: '10px' }}>
            Copyright © 2023 Design Barn Inc.
          </Typography>
        </Box>

        {/* <Box style={{ display: 'flex', gap: "1rem" }}>
          <Typography varian="pi" onClick={() => window.open("https://feedback.lottiefiles.com/web", "_blank")} style={{ color: "#808E9A", fontSize: '10px', cursor: 'pointer' }}>
            Feedback
          </Typography>
          <Typography varian="pi" onClick={() => window.open("https://feedback.lottiefiles.com/web", "_blank")} style={{ color: "#808E9A", fontSize: '10px', cursor: 'pointer' }}>
            Help Center
          </Typography>
        </Box> */}
      </Box>
    </LottieUserContainer>
  );
};

export default LottieUser;

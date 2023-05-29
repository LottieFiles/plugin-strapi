import React, { useState } from "react";

// @ts-ignore
import {
  Avatar,
  Card,
  CardBody,
  CardCheckbox,
  CardContent,
  CardHeader,
  Flex,
  GridItem,
  Typography,
} from "@strapi/design-system";

import styled from "styled-components";
import { LottiePlayer } from "../Player/lottie-player";

const AnimationContainer = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  height: 6.25rem;
  width: 100%;
  z-index: 1;
`;

const AnimationCheckbox = styled.div`
  z-index: 2;
`;

const LottieAnimation = ({ animation, setSelected }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = async (e) => {
    setSelected(e);
  };

  return (
    <GridItem
      key={animation.id}
      background="neutral100"
      padding={1}
      col={3}
      s={12}
    >
      <Card>
        <CardHeader>
          <AnimationCheckbox>
            <CardCheckbox
              data-testid={`animation-${animation.id}`}
              id={`animation-${animation.id}`}
              style={{ zIndex: 10 }}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                if (e.target.checked) {
                  handleOnChange(animation);
                } else {
                  handleOnChange(null);
                }
              }}
              value={isChecked}
            />
          </AnimationCheckbox>

          <AnimationContainer>
            <LottiePlayer
              bgColor={animation.bgColor}
              src={animation.lottieUrl}
              isPreview={true}
              style={{ width: "100%" }}
            />
          </AnimationContainer>
        </CardHeader>
        <CardBody>
          <CardContent>
            {animation?.createdBy && (
              <Flex justifyContent="space-between">
                <Avatar
                  src={animation.createdBy.avatarUrl ?? ""}
                  alt={animation.createdBy.firstName ?? ""}
                  preview
                />
                <Typography style={{ marginLeft: "5px" }} variant="pi">
                  {animation.createdBy.firstName ?? ""}
                </Typography>
              </Flex>
            )}
          </CardContent>
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default LottieAnimation;

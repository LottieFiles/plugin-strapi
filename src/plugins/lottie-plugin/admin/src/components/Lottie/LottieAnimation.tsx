import React, { useState, useRef, useEffect } from "react";

// @ts-ignore
import { Grid, GridItem } from "@strapi/design-system/Grid";
// @ts-ignore
import { Typography } from "@strapi/design-system/Typography";
// @ts-ignore
import { Flex } from "@strapi/design-system/Flex";
// @ts-ignore
import { Avatar, AvatarGroup } from "@strapi/design-system/Avatar";

import {
  Card,
  CardHeader,
  CardBody,
  CardCheckbox,
  CardAsset,
  CardContent,
  // @ts-ignore
} from "@strapi/design-system/Card";
import { LottiePlayer } from "../Player/lottie-player";
import styled from "styled-components";

const AnimationContainer = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  height: 10.25rem;
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
            <Flex justifyContent="space-between">
              <Avatar
                src={animation.createdBy.avatarUrl}
                alt={animation.createdBy.firstName}
                preview
              />
              <Typography style={{ marginLeft: "5px" }} variant="pi">
                {animation.createdBy.firstName}
              </Typography>
            </Flex>
          </CardContent>
        </CardBody>
      </Card>
    </GridItem>
  );
};

export default LottieAnimation;

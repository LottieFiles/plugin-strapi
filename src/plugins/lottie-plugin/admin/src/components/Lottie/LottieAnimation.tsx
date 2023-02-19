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
          <CardAsset src={animation.gifUrl} />
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

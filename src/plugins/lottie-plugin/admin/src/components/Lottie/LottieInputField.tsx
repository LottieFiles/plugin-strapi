import React, { useState, useRef, useEffect } from "react";
import {
  CarouselInput,
  CarouselSlide,
  CarouselImage,
  CarouselActions,
  ModalHeader,
  ModalLayout,
  BaseButton,
  IconButton,
  Box,
  Avatar,
  Typography,
  Stack,
} from "@strapi/design-system";
import { Pencil, Play, Plus, Trash } from "@strapi/icons";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import LottieInputDialogue from "./LottieInputDialogue";
import {
  Card,
  CardHeader,
  CardBody,
  CardCheckbox,
  CardAsset,
  CardContent,
  // @ts-ignore
} from "@strapi/design-system/Card";
import "@dotlottie/player-component";

const LottieInput = ({
  attribute,
  description,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  required,
  value,
}) => {
  const { formatMessage } = useIntl();
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = async (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  const handleSelect = async (e) => {  
    onChange({
      target: {
        name,
        value: e ? JSON.stringify(e) : null,
        type: attribute.type,
      },
    });
  };
  
  return (
    <CarouselInput
      label={formatMessage({ id: getTrad("color-picker.label") })}
      selectedSlide={0}
      previousLabel="Previous slide"
      nextLabel="Next slide"
      onNext={() => {}}
      onPrevious={() => {}}
      actions={
        <CarouselActions>
          {value && (
            <>
              <IconButton
                onClick={handleToggle}
                label="Edit"
                icon={<Pencil />}
              />
              <IconButton
                onClick={() => handleSelect(null)}
                label="Delete"
                icon={<Trash />}
              />
            </>
          )}
        </CarouselActions>
      }
      style={{
        width: "90%",
      }}
    >
      <CarouselSlide label="1 of 1 slides">
        <>
          {value ? (
            // <LottiePlayer
            //   bgColor={JSON.parse(value).bgColor}
            //   src={JSON.parse(value).lottieUrl}
            //   isPreview={true}
            //   style={{ width: "100%" }}
            // />
            //@ts-ignore
            <dotlottie-player
              autoplay
              loop
              mode="normal"
              src={JSON.parse(value).lottieUrl}
              style={{ width: "100%" }}
            />
          ) : (
            <>
              <Stack>
                <Box style={{ margin: "auto" }}>
                  <BaseButton style={{ margin: "auto" }} onClick={handleToggle}>
                    <Avatar
                      src="https://static10.lottiefiles.com/images/logo/icon.svg"
                      style={{ display: "block" }}
                      alt="LottieFiles Logo"
                    />
                  </BaseButton>
                </Box>
                <Box>
                  <Typography
                    textColor={value ? null : "neutral600"}
                    variant="pi"
                  >
                    Click to select
                  </Typography>
                </Box>
              </Stack>
            </>
          )}
          {isVisible && (
            <LottieInputDialogue
              setIsVisible={setIsVisible}
              handleSelect={handleSelect}
            />
          )}
        </>
      </CarouselSlide>
    </CarouselInput>
  );
};

export default LottieInput;

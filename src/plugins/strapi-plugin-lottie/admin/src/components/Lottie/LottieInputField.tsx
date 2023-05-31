import {
  Avatar,
  BaseButton,
  Box,
  CarouselActions,
  CarouselInput,
  CarouselSlide,
  IconButton,
  Stack,
  Typography,
} from "@strapi/design-system";
import { Pencil, Trash } from "@strapi/icons";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import LottieInputDialogue from "./LottieInputDialogue";

import "@dotlottie/player-component";
import styled from "styled-components";
import { LottieProvider } from "../../context/lottie-provider";

const BrowseAnimation = styled.button``;

const LottieInput = ({ attribute, name, onChange, value }) => {
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
        value: null,
        type: attribute.type,
      },
    });

    setTimeout(() => {
      onChange({
        target: {
          name,
          value: e ? JSON.stringify(e) : null,
          type: attribute.type,
        },
      });
      setIsVisible((prev) => !prev);
    }, 100)
  };


  const handleDelete = async (e) => {
    onChange({
      target: {
        name,
        value: null,
        type: attribute.type,
      },
    });
  };
  

  return (
    <CarouselInput
      label={formatMessage({ id: getTrad("color-picker.label") })}
      data-testid="lottie-input"
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
                id="edit-animation-field"
                onClick={handleToggle}
                label="Edit"
                icon={<Pencil />}
              />
              <IconButton
               id="delete-animation-field"
                onClick={handleDelete}
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
            //@ts-ignore
            <dotlottie-player
              autoplay
              loop
              mode="normal"
              src={value && JSON.parse(value).lottieUrl}
              style={{ width: "100%" }}
            />
          ) : (
            <>
              <Stack>
                <Box style={{ margin: "auto" }}>
                  <BrowseAnimation
                    data-testid="toggle-dialog-button"
                    type="button"
                    onClick={handleToggle}
                  >
                    <Avatar
                      src="https://static10.lottiefiles.com/images/logo/icon.svg"
                      style={{ display: "block" }}
                      alt="LottieFiles Logo"
                    />
                  </BrowseAnimation>
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
            <LottieProvider>
              <LottieInputDialogue
                setIsVisible={setIsVisible}
                handleSelect={handleSelect}
              />
            </LottieProvider>
          )}
        </>
      </CarouselSlide>
    </CarouselInput>
  );
};

export default LottieInput;

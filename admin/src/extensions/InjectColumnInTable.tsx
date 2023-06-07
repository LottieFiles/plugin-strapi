import React from "react";
// @ts-ignore
import { Avatar } from "@strapi/design-system/Avatar";
const addColumnToTableHook = ({ displayedHeaders, layout }) => {
  displayedHeaders = displayedHeaders.map((displayedHeader) => {
    if (
      displayedHeader.fieldSchema.customField &&
      displayedHeader.fieldSchema.customField ===
        "plugin::strapi-plugin-lottie.lottie"
    ) {
      return {
        ...displayedHeader,
        key: displayedHeader.key,
        name: displayedHeader.name,
        fieldSchema: displayedHeader.fieldSchema,
        metadatas: displayedHeader.metadatas,
        cellFormatter: (data: any) => {
          return (
            <Avatar
              src={JSON.parse(data[displayedHeader.name]).gifUrl}
              alt={JSON.parse(data[displayedHeader.name]).bgColorname}
            />
          );
        },
      };
    } else {
      return displayedHeader;
    }
  });
  return {
    displayedHeaders: [...displayedHeaders],
    layout,
  };
};

export default addColumnToTableHook;

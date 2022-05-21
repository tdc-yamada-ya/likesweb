import { Box } from "@mui/material";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Count } from "./Count";
import { useTitle } from "./hooks/useTitle";

export const ViewPage = () => {
  const title = useTitle();

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box
        sx={{
          alignItems: "center",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <Count />
      </Box>
    </Fragment>
  );
};

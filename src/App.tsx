import { Global } from "@emotion/react";
import {
  Box,
  createTheme,
  Fab,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import "@fontsource/oswald";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import countapi from "countapi-js";

const getParameters = () => {
  const url = new URL(document.URL);
  const namespace = url.searchParams.get("ns") ?? "default";
  const key = url.searchParams.get("k") ?? "";
  const mode = url.searchParams.get("m") ?? "";
  return { namespace, key, mode };
};

const ErrorPage = () => {
  return (
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
      <Typography variant="h4">Likes</Typography>
      <Typography color="error">
        Unable to view page. The "key" parameter is required.
      </Typography>
    </Box>
  );
};

const HitPage = ({
  namespace,
  countKey,
}: {
  namespace: string;
  countKey: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { value } = await countapi.get(namespace, countKey);
      setCount(value);
    })();
  }, [countKey, namespace]);

  const hit = async () => {
    const { value } = await countapi.hit(namespace, countKey);
    setCount(value);
  };

  return (
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
      <Typography variant="h4">Likes</Typography>
      <Box>
        <Fab
          color="primary"
          size="large"
          sx={{ height: "6rem", width: "6rem" }}
          onClick={() => hit()}
        >
          <ThumbUpIcon sx={{ height: "2rem", width: "2rem" }} />
        </Fab>
      </Box>
      <Box>
        <Typography>{count}</Typography>
      </Box>
    </Box>
  );
};

const ViewPage = ({
  namespace,
  countKey,
}: {
  namespace: string;
  countKey: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = async () => {
      const { value } = await countapi.get(namespace, countKey);
      setCount(value);
    };
    const id = setInterval(() => update(), 30000);
    update();
    return () => clearInterval(id);
  }, [namespace, countKey]);

  return (
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
      <Box>
        <Typography variant="h1">{count}</Typography>
      </Box>
    </Box>
  );
};

export const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: `"Oswald", sans-serif`,
    },
  });
  const { namespace, key, mode } = getParameters();

  return (
    <Fragment>
      <Global
        styles={{
          html: {
            height: "100%",
          },
          body: {
            height: "100%",
            margin: 0,
          },
          "#root": {
            height: "100%",
          },
        }}
      />
      <ThemeProvider theme={theme}>
        {key ? (
          mode === "v" ? (
            <ViewPage namespace={namespace} countKey={key} />
          ) : (
            <HitPage namespace={namespace} countKey={key} />
          )
        ) : (
          <ErrorPage />
        )}
      </ThemeProvider>
    </Fragment>
  );
};

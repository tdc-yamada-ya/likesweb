import { Global } from "@emotion/react";
import "@fontsource/oswald";
import { createTheme, ThemeProvider } from "@mui/material";
import { Fragment } from "react";
import { HelmetProvider } from "react-helmet-async";
import { LikesProvider } from "./hooks/useLikes";
import { IndexPage } from "./IndexPage";
import { LikePage } from "./LikePage";
import { ViewPage } from "./ViewPage";

const getParameters = () => {
  const url = new URL(document.URL);
  const room = {
    namespace: url.searchParams.get("ns") ?? "default",
    key: url.searchParams.get("k") ?? "",
  };
  const mode = url.searchParams.get("m") ?? "";
  return { room, mode };
};

export const App = () => {
  const { room, mode } = getParameters();
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: `"Oswald", sans-serif`,
      fontSize: 16,
    },
  });

  return (
    <Fragment>
      <Global
        styles={{
          html: {
            height: "100%",
          },
          body: {
            background: "#222",
            color: "#fff",
            height: "100%",
            margin: 0,
          },
          "#root": {
            height: "100%",
          },
        }}
      />
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          {room.key ? (
            <LikesProvider room={room}>
              {mode === "v" ? <ViewPage /> : <LikePage />}
            </LikesProvider>
          ) : (
            <IndexPage />
          )}
        </ThemeProvider>
      </HelmetProvider>
    </Fragment>
  );
};

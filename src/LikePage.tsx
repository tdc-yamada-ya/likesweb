import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Box, Button, Link, Typography } from "@mui/material";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Count } from "./Count";
import { Footer } from "./Footer";
import { useLike } from "./hooks/useLike";
import { useLikes } from "./hooks/useLikes";
import { useTitle } from "./hooks/useTitle";

export const LikePage = () => {
  const title = useTitle();
  const { room, refresh } = useLikes();
  const like = useLike(room, () => refresh());

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box
        sx={{
          alignItems: "center",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
          Likes Counter
        </Typography>
        <Box>
          <Button
            sx={{ fontSize: "1.2rem", width: "8rem" }}
            color="primary"
            size="large"
            onClick={() => like()}
            variant="contained"
            startIcon={<ThumbUpIcon />}
          >
            Like
          </Button>
        </Box>
        <Count />
        <Box>
          <Link
            sx={{ display: "flex", alignItems: "center" }}
            href={`?ns=${room.namespace}&k=${room.key}&m=v`}
            target="_blank"
          >
            <OpenInNewIcon sx={{ mr: "0.2em" }} />
            <Typography>View Mode</Typography>
          </Link>
        </Box>
        <Footer />
      </Box>
    </Fragment>
  );
};

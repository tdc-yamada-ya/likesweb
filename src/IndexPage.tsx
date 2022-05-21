import { Button, Container, Typography } from "@mui/material";
import { Footer } from "./Footer";
import { useCreateRoom } from "./hooks/useCreateRoom";

export const IndexPage = () => {
  const createRoom = useCreateRoom();

  return (
    <Container
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
      <Typography variant="body2">
        This is a simple service to share likes.
      </Typography>
      <Button variant="outlined" onClick={() => createRoom()}>
        Create Room
      </Button>
      <Footer />
    </Container>
  );
};

import { Fragment } from "react";
import { DSEG } from "./DSEG";
import { useDelayedLikes } from "./hooks/useDelayedCount";

export const Count = ({ minLength = 5 }: { minLength?: number }) => {
  const likes = useDelayedLikes();

  return (
    <Fragment>
      <div
        css={{
          fontSize: "48px",
          display: "flex",
          flexDirection: "column",
          gap: "0.2em",
        }}
      >
        <DSEG color="#64ffda" value={"LIKES"} />
        <DSEG
          color="#64ffda"
          value={(likes ?? 0).toString().padStart(minLength, "!")}
        />
      </div>
    </Fragment>
  );
};

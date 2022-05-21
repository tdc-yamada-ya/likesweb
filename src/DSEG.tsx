import "@fontsource/dseg14";

export const DSEG = ({ color, value }: { color: string; value: string }) => (
  <div css={{ fontFamily: "DSEG14", position: "relative" }}>
    <div css={{ opacity: 0.2, position: "absolute" }}>
      {"8".repeat(value.length)}
    </div>
    <div css={{ color, textShadow: `0 0 1em ${color}` }}>{value}</div>
  </div>
);

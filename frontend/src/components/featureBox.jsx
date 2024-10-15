import {Box, Typography} from "@mui/material"
import { NavLink } from "react-router-dom";
import styles from "./featureBox.module.css";
const FeatureBox = ({ imgSrc, text, imagePosition = "left" }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      flexDirection: imagePosition === "left" ? "row" : "row-reverse",
      paddingY: "1em",
      backgroundColor: "#faf9f6",
      width:"50em"
    }}
  >
    <img
      src={imgSrc}
      style={{
        marginRight: imagePosition === "left" ? "1em" : 0,
        marginLeft: imagePosition === "right" ? "1em" : 0,
        width:"12em"
      }}
    />
    <Typography>
      <NavLink className={styles.linkText} to="/register">{text}</NavLink>
    </Typography>
  </Box>
);

export default FeatureBox;

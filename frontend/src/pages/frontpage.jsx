import { Box, createTheme, ThemeProvider} from "@mui/material";
import trackImg from "../assets/Track.png";
import planImg from "../assets/Plan.png";
import goalsImg from "../assets/Goals.png";
import FeatureBox from "../components/featureBox";
const theme = createTheme({
  palette: {
    primary: {
      main: "#4bb966", // orange
      contrastText: "#080357", // dark blue
    },
  },
});

const FrontPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "1em" }}>
        <Box
          sx={{
            padding: "1em",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FeatureBox imgSrc={trackImg} text="Track your expenses"/>
          <FeatureBox imgSrc={planImg} text="Make a budget" imagePosition="right"/>
          <FeatureBox imgSrc={goalsImg} text="Meet your financial goals" />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default FrontPage;

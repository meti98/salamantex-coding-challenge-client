import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
            fontWeight: "bold",
            margin: "10px",
            "&:hover": {
            }
            }
        }
    }
})

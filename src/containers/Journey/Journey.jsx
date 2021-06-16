import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { journeyActions } from "../../store/duks";
import * as Service from "../../services/journey.service";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const Journey = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user, isAuthenticated } = useSelector((state) => state.userReducer);

  console.log({ user, isAuthenticated });

  useEffect(() => {
    dispatch(journeyActions.get());
  });

  return (
    <Paper variant="outlined">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Criar Jornada</Typography>
          <Button
            onClick={() => Service.create()}
          >
            criar!
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <form>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </form>
        </AccordionDetails>
      </Accordion>
      Journey
    </Paper>
  );
};

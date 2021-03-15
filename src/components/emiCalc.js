import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
  TextField,
  withStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    width: "50ch",
  },
  paper: {
    height: 400,
    width: 300,
  },
  maingrid: {
    justifyContent: "center",
    display: "inline-grid",
  },

  mainGridItem: {
    border: "1px solid #bee1cc",
    padding: 30,
    borderRadius: 10,
  },
  forminput: {
    paddingLeft: 40,
    width: "12rem",
    paddingBottom: 10,
    marginLeft: "4rem",
  },

  rateinput: {
    paddingLeft: 16,
    width: "13.3rem",
    marginLeft: "4rem",
  },
  formlabel: {
    marginLeft: "4rem",
  },
  slider: {
    paddingBottom: 30,
  },
  titleHead: {
    padding: 15,
    color: "#52af77",
  },
  resultEmi: {
    backgroundColor: "#e3fbed",
    borderRadius: 10,
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#bee1cc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#52af77",
      },
    },
  },
})(TextField);

const followersMarks = [
  {
    value: 50000,
    scaledValue: 50000,
    label: "50k",
  },
  {
    value: 1500000,
    scaledValue: 1500000,
    label: "1.5M",
  },
  // {
  //   value: 50,
  //   scaledValue: 200000,
  //   label: "200k",
  // },
  // {
  //   value: 75,
  //   scaledValue: 400000,
  //   label: "400k",
  // },
  // {
  //   value: 100,
  //   scaledValue: 800000,
  //   label: "800k",
  // },
  // {
  //   value: 125,
  //   scaledValue: 1500000,
  //   label: "1.5m",
  // },
];

const interestRates = [
  {
    value: 10,
    scaledValue: 10,
    label: "10.5%",
  },
  {
    value: 24,
    scaledValue: 24,
    label: "24%",
  },
];

const totalYears = [
  {
    value: 1,
    scaledValue: 1,
    label: "1",
  },
  {
    value: 5,
    scaledValue: 5,
    label: "5",
  },
];

function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "M";
  } else if (num < 900) {
    return num;
  }
}
function Emi_Calculator() {
  const classes = useStyles();
  const [range, setRange] = useState(50000);
  const [rate, setRate] = useState(10.5);
  const [year, setYear] = useState(1);

  const handleChange = (e, newValue) => {
    setRange(newValue);
  };

  const rateChange = (e, newRate) => {
    setRate(newRate);
  };

  const yearChange = (e, newYear) => {
    setYear(newYear);
  };

  const handleRange = (e) => {
    let inValue = e.target.value;
    setRange(inValue);
  };

  const handleRate = (e) => {
    let inRate = e.target.value;
    setRate(inRate);
  };

  const handleYear = (e) => {
    let inYear = e.target.value;
    setYear(inYear);
  };

  console.log(range);

  const principalAmount = range;
  const rateOfInterest = rate / (12 * 100);
  const numberOfYears = year * 12;

  const totalEmi =
    (principalAmount *
      rateOfInterest *
      Math.pow(1 + rateOfInterest, numberOfYears)) /
    (Math.pow(1 + rateOfInterest, numberOfYears) - 1);

  return (
    <Container>
      <Typography variant="h5" align="center" className={classes.titleHead}>
        Personal Loan EMI Calculators
      </Typography>
      <Grid container className={classes.maingrid}>
        <Grid item className={classes.mainGridItem}>
          <Grid item xs={6}>
            <FormGroup row>
              <FormControlLabel
                className={classes.formlabel}
                label="Loan Amount"
                control={
                  <CssTextField
                    className={classes.forminput}
                    variant="outlined"
                    size="small"
                    value={range}
                    onChange={handleRange}
                  />
                }
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>
          <Grid item>
            <PrettoSlider
              className={classes.slider}
              value={range}
              min={50000}
              step={1000}
              max={1500000}
              valueLabelFormat={numFormatter}
              marks={followersMarks}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
            />
          </Grid>
          <Grid item xs={6}>
            <FormGroup row>
              <FormControlLabel
                className={classes.formlabel}
                label="Interest Rate % (p.a)"
                control={
                  <CssTextField
                    className={classes.rateinput}
                    variant="outlined"
                    size="small"
                    value={rate}
                    onChange={handleRate}
                  />
                }
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>
          <Grid item>
            <PrettoSlider
              className={classes.slider}
              valueLabelDisplay="auto"
              min={10}
              step={0.5}
              max={24}
              marks={interestRates}
              onChange={rateChange}
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
            />
          </Grid>
          <Grid item xs={6}>
            <FormGroup row>
              <FormControlLabel
                className={classes.formlabel}
                label="Tenure (years)"
                control={
                  <CssTextField
                    className={classes.forminput}
                    variant="outlined"
                    size="small"
                    value={year}
                    onChange={handleYear}
                  />
                }
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>
          <Grid item>
            <PrettoSlider
              className={classes.slider}
              valueLabelDisplay="auto"
              min={1}
              step={1}
              max={5}
              marks={totalYears}
              onChange={yearChange}
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
            />
          </Grid>
          <Grid item className={classes.resultEmi}>
            <Typography
              variant="h5"
              align="center"
              className={classes.titleHead}
            >
              Equated Monthly Installments (EMI)
              <br />
              <br />
              {totalEmi}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Emi_Calculator;

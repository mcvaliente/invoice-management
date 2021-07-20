import React, { useEffect, useState } from "react";
import { getWeb3, getCurrentAccount } from "../../utils/web3";
import invoice from "../../contracts/invoice";
import { useParams, Redirect, NavLink } from "react-router-dom";
import MetaMaskConnectionDialog from "../wallet/MetaMaskConnectionDialog";
import {
  cooperatives,
  countries,
  offices,
  occupationCategories,
  occupations,
} from "../../utils/invoiceconfig";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInput,
  Divider,
  Radio,
  RadioGroup,
  FormLabel,
  MenuItem,
  Switch,
  Fab,
  Tooltip,
} from "@material-ui/core";
import styles from "../../assets/css/InvoiceInfo.module.css";
import { Loader } from "../../utils/Loader";
import InvoiceOccupations from "./InvoiceOccupations";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import Layout from "../shared/Layout";

const GreenSwitch = withStyles({
  switchBase: {
    color: "#aa4994",
    "&$checked": {
      color: green[700],
    },
    "&$checked + $track": {
      backgroundColor: green[700],
    },
  },
  checked: {},
  track: {},
})(Switch);

//Using Hooks.
export default function InvoiceInfo(props) {
  const { id } = useParams();

  const [paidInvoice, setPaidInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [vatBase, setVatBase] = useState("");
  const [vatPercentage, setVatPercentage] = useState("");
  const [vatTotal, setVatTotal] = useState("");
  const [eurTotalAmount, setEurTotalAmount] = useState("");
  const [usdExchangeRate, setUsdExchangeRate] = useState("");
  const [usdTotalAmount, setUsdTotalAmount] = useState("");
  const [currentCategory, setCurrentCategory] = useState("category00");
  const [currentOccupation, setCurrentOccupation] = useState("occupation00");
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [currentCooperative, setCurrentCooperative] = useState("cooperative00");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("country00");
  const [currentOffice, setCurrentOffice] = useState("office00");
  const [saveBlockchain, setSaveBlockchain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(
    props.metaMaskConnected
  );
  const [connectionErrorMessage, setConnectionErrorMessage] = useState("");
  const [reloadPage, setReloadPage] = useState(false);

  const web3 = getWeb3();

  useEffect(() => {
    async function getInvoiceInfo() {
      setLoading(true);
      try {
        console.log("Parameter id: ", id);
        setInvoiceId(id);
        if (isMetaMaskConnected) {
          //Check if the invoice is stored in the blockchain.
          setLoading(false);
        } else {
          setLoading(false);
          setConnectionErrorMessage("Invoice Info - MetaMask is unavailable.");
        }
      } catch (error) {
        setLoading(false);
        console.error(
          "EXCEPTION ERROR - New invoice MetaMask Error (saveInvoiceOKDialogHandler): " +
            error.message
        );
        setConnectionErrorMessage("EXCEPTION ERROR: " + error.message);
      }
    }

    getInvoiceInfo();
  }, [isMetaMaskConnected, id]);

  const metamaskConnectionDialogHandler = () => {
    setConnectionErrorMessage("");
    //We assume that when the user closes this dialog
    //MetaMask will be available now.
    setIsMetaMaskConnected(true);
  };

  return (
    <>
      <div style={{ marginTop: "30px", marginBottom: "30px", float: "right" }}>
        <Tooltip title="Add a new invoice" arrow>
          <NavLink to="/" alt="">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </NavLink>
        </Tooltip>
      </div>
      <Typography variant="h5" className={styles.title} noWrap>
        {invoiceId}
      </Typography>
      <form className={styles.invoiceInfo}>
        <Typography variant="h6" className={styles.title} noWrap>
          Invoice details
        </Typography>
        <br />
        <div className={styles.divForm}>
          <FormControlLabel
            control={
              <GreenSwitch checked={paidInvoice} name="checkedPaidInvoice" />
            }
            readOnly
            label="Paid"
          />
        </div>
        <div className={styles.divForm}>
          <FormControl
            variant="outlined"
            style={{ width: "40%", marginRight: "50px" }}
          >
            <InputLabel htmlFor="inputInvoiceId">Invoice</InputLabel>
            <OutlinedInput
              id="inputInvoiceId"
              labelWidth={50}
              value={invoiceId}
              readOnly
            />
          </FormControl>
        </div>
        <div className={styles.divForm}>
          <TextField
            id="txtInvoiceDate"
            label="Invoice date"
            type="date"
            format=""
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            style={{ marginRight: "15px" }}
            width="20ch"
            value={invoiceDate}
            readOnly
          />
          <TextField
            id="txtDueDate"
            label="Due date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            width="20ch"
            value={dueDate}
            readOnly
          />{" "}
        </div>
        <div className={styles.divForm}>
          <FormControl variant="outlined" style={{ marginRight: "15px" }}>
            <InputLabel htmlFor="inputVatBase">VAT base</InputLabel>
            <OutlinedInput
              id="inputVatBase"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              labelWidth={70}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              value={vatBase}
              readOnly
            />
          </FormControl>
          <FormControl
            variant="outlined"
            style={{ marginRight: "15px", width: "15%" }}
          >
            <InputLabel htmlFor="inputVatPercentage">VAT percentage</InputLabel>
            <OutlinedInput
              id="inputVatPercentage"
              startAdornment={
                <InputAdornment position="start">%</InputAdornment>
              }
              labelWidth={115}
              value={vatPercentage}
              readOnly
            />
          </FormControl>
          <FormControl
            variant="outlined"
            style={{ backgroundColor: "#E9EDF6" }}
          >
            <InputLabel htmlFor="inputVatTotal">VAT total</InputLabel>
            <OutlinedInput
              id="inputVatTotal"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              labelWidth={70}
              readOnly
              disabled
              value={vatTotal}
            />
          </FormControl>
        </div>
        <div className={styles.divForm}>
          <FormControl
            variant="outlined"
            style={{ marginRight: "15px", backgroundColor: "#E9EDF6" }}
          >
            <InputLabel htmlFor="inputTotalAmountEUR">
              EUR Total amount
            </InputLabel>
            <OutlinedInput
              id="inputTotalAmountEUR"
              startAdornment={
                <InputAdornment position="start">€</InputAdornment>
              }
              labelWidth={130}
              readOnly
              disabled
              value={eurTotalAmount}
            />
          </FormControl>
          <FormControl
            variant="outlined"
            style={{ marginRight: "15px", width: "15%" }}
          >
            <InputLabel htmlFor="inputUsdExchangeRate">
              USD Exchange rate
            </InputLabel>
            <OutlinedInput
              id="inputUsdExchangeRate"
              startAdornment={
                <InputAdornment position="start">#</InputAdornment>
              }
              labelWidth={145}
              value={usdExchangeRate}
              readOnly
            />
          </FormControl>
          <FormControl
            variant="outlined"
            style={{ backgroundColor: "#E9EDF6" }}
          >
            <InputLabel htmlFor="inputTotalAmountUSD">
              USD Total amount
            </InputLabel>
            <OutlinedInput
              id="inputTotalAmountUSD"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={130}
              readOnly
              disabled
              value={usdTotalAmount}
            />
          </FormControl>
        </div>
        <div>
          <InvoiceOccupations
            occupations={selectedOccupations}
            canDelete={false}
          />
        </div>
        <br />
        <Divider />
        <Typography variant="h6" className={styles.title} noWrap>
          Member details
        </Typography>
        <br />
        <div className={styles.divForm}>
          <FormControl
            variant="outlined"
            style={{ width: "15%", marginRight: "15px" }}
          >
            <InputLabel htmlFor="inputAge">Age</InputLabel>
            <OutlinedInput id="inputAge" labelWidth={30} value={age} readOnly />
          </FormControl>
          <FormControl component="fieldset" disabled>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={gender} row>
              <FormControlLabel
                value="female"
                control={<Radio style={{ color: "#aa4994" }} />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio style={{ color: "#aa4994" }} />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<Radio style={{ color: "#aa4994" }} />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>{" "}
        </div>
        <div className={styles.divForm}>
          <TextField
            id="selectCooperative"
            select
            label="Cooperative"
            variant="outlined"
            style={{ marginRight: "15px" }}
            value={currentCooperative}
            readOnly
          >
            <MenuItem key="cooperative00" value="cooperative00">
              Select a cooperative...
            </MenuItem>
            {cooperatives.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="selectCountry"
            select
            label="Country"
            variant="outlined"
            style={{ marginRight: "15px" }}
            value={currentCountry}
            readOnly
          >
            <MenuItem key="country00" value="country00">
              Select a country...
            </MenuItem>
            {countries.map((option) =>
              selectedCountries.includes(option.id) ? (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ) : null
            )}
          </TextField>
          <TextField
            id="selectOffice"
            select
            label="Office"
            variant="outlined"
            value={currentOffice}
            readOnly
          >
            <MenuItem key="office00" value="office00">
              Select an office...
            </MenuItem>
            {offices.map((option) =>
              option.cooperative === currentCooperative &&
              option.country === currentCountry ? (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ) : null
            )}
          </TextField>
        </div>
        {!!errorMessages.general ? (
          <Alert variant="filled" severity="error">
            {errorMessages.general}
          </Alert>
        ) : null}
        <div className={styles.spacer}> </div>
      </form>{" "}
      {!!connectionErrorMessage ? (
        <MetaMaskConnectionDialog
          metamaskConnDialogHandler={metamaskConnectionDialogHandler}
          errorMessage={connectionErrorMessage}
        />
      ) : null}
      {loading ? <Loader /> : null}
    </>
  );
}

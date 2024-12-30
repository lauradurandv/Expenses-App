import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { addExpense, fetchExpenses } from "../services/api";
const AddWindow = ({
  handleAddOpenDialogue,
  handleAddCloseDialogue,
  openAddDialogue,
  setOpenAddDialogue,
  setExpenses,
}) => {
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: 0,
    description: "",
  });
  const [displayMessage, setDisplayMessage] = useState("");
  const handleNewExpenseInput = (event) => {
    const { name, value } = event.target;
    setNewExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddingExpense = () => {
    const bodyData = newExpense;
    const createExpense = async () => {
      setDisplayMessage("");
      try {
        await addExpense(bodyData);
        setDisplayMessage("Expenses Added.");
        const response = await fetchExpenses();
        setOpenAddDialogue(false);
        setExpenses(response);
        setDisplayMessage("");
      } catch (error) {
        console.error(error);
      }
    };

    createExpense();
  };
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab size="large" color="primary" aria-label="add">
        <AddIcon onClick={handleAddOpenDialogue} />
        <Dialog onClose={handleAddCloseDialogue} open={openAddDialogue}>
          <DialogTitle>New Expense</DialogTitle>
          <Box p={2} textAlign="left">
            <InputLabel id="add-category">Category</InputLabel>
            <Select
              required
              labelId="Catergory"
              name="category"
              value={newExpense.category}
              label="Category"
              onChange={handleNewExpenseInput}
            >
              <MenuItem value={"Wants"}>Wants</MenuItem>
              <MenuItem value={"Needs"}>Needs</MenuItem>
              <MenuItem value={"Savings"}>Savings</MenuItem>
            </Select>
            <TextField
              required
              id="add-amount"
              label="Amount"
              variant="outlined"
              type="number"
              name="amount"
              value={newExpense.amount}
              fullWidth
              margin="normal"
              onChange={handleNewExpenseInput}
            />
            <TextField
              required
              id="add-description"
              name="description"
              label="Description"
              variant="outlined"
              value={newExpense.description}
              fullWidth
              margin="normal"
              onChange={handleNewExpenseInput}
            />
            <Button variant="contained" onClick={handleAddingExpense}>
              Add
            </Button>
            {displayMessage ? displayMessage : displayMessage}
          </Box>
        </Dialog>
      </Fab>
    </Box>
  );
};
export default AddWindow;

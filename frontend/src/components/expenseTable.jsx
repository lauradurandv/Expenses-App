import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchExpenses, updateExpense } from "../services/api";
import { useState } from "react";
const ExpenseTable = ({
  editRowId,
  setEditRowId,
  setSelectedExpense,
  expenses,
  setExpenses,
  setOpenDeleteDialogue,
}) => {
  //state management
  const [formData, setFormData] = useState({
    category: "",
    amount: 0,
    description: "",
  });

  //handling input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handling submit
  const handleSave = async (rowId) => {
    const bodyData = formData;

    try {
      await updateExpense(rowId, bodyData);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetchExpenses();
      setExpenses(response);
    } catch (error) {
      console.error(error);
    }
    setEditRowId(null);
  };

  const handleEdit = (row) => {
    setEditRowId(row._id);
    setFormData({
      category: row.category,
      amount: row.amount,
      description: row.description,
    });
  };

  const handleDeleteOpenDialogue = (rowId) => {
    setOpenDeleteDialogue(true);
    const row = expenses.find((expense) => expense._id === rowId);
    setSelectedExpense(row);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {editRowId === row._id ? (
                  <>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      required
                      labelId="catergory"
                      name="category"
                      value={formData.category}
                      label="category"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Wants"}>Wants</MenuItem>
                      <MenuItem value={"Needs"}>Needs</MenuItem>
                      <MenuItem value={"Savings"}>Savings</MenuItem>
                    </Select>
                  </>
                ) : (
                  row.category
                )}
              </TableCell>
              <TableCell align="right">
                {editRowId === row._id ? (
                  <TextField
                    required
                    name="amount"
                    label="Amount"
                    variant="outlined"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                ) : (
                  row.amount
                )}
              </TableCell>
              <TableCell align="right">
                {editRowId === row._id ? (
                  <TextField
                    required
                    name="description"
                    label="Description"
                    variant="outlined"
                    type="text"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  row.description
                )}
              </TableCell>
              <TableCell>
                {editRowId === row._id ? (
                  <Button
                    variant="outlined"
                    onClick={() => handleSave(row._id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={() => handleEdit(row)}>
                    Edit
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteOpenDialogue(row._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ExpenseTable;

import { createTheme, ThemeProvider } from "@mui/material";
import { fetchExpenses } from "../services/api";
import { useEffect, useState } from "react";
import ExpenseTable from "../components/expenseTable";
import DeleteWindow from "../components/deleteWindow";
import AddWindow from "../components/addWindow";
const theme = createTheme({
  typography: {
    fontFamily: "Segoe UI",
  },
  palette: {
    primary: {
      main: "#4bb966", // green
      contrastText: "#080357", // dark blue
    },
  },
});

const Dashboard = () => {
  const [openAddDialogue, setOpenAddDialogue] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [expenses, setExpenses] = useState([]);

  //fetching data
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetchExpenses();
        setExpenses(response);
      } catch (error) {
        console.error(error);
      }
    };
    getExpenses();
  }, []);

  const handleAddOpenDialogue = () => {
    setOpenAddDialogue(true);
  };

  const handleAddCloseDialogue = () => {
    setOpenAddDialogue(!openAddDialogue);
  };

  return (
    <ThemeProvider theme={theme}>
      <ExpenseTable
        expenses={expenses}
        setExpenses={setExpenses}
        editRowId={editRowId}
        setEditRowId={setEditRowId}
        setSelectedExpense={setSelectedExpense}
        setOpenDeleteDialogue={setOpenDeleteDialogue}
      />
      <DeleteWindow
        selectedExpense={selectedExpense}
        setExpenses={setExpenses}
        setOpenDeleteDialogue={setOpenDeleteDialogue}
        openDeleteDialogue={openDeleteDialogue}
      />
      <AddWindow
        handleAddOpenDialogue={handleAddOpenDialogue}
        handleAddCloseDialogue={handleAddCloseDialogue}
        openAddDialogue={openAddDialogue}
        setOpenAddDialogue={setOpenAddDialogue}
        setExpenses={setExpenses}
      />
    </ThemeProvider>
  );
};
export default Dashboard;

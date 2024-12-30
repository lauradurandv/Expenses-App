import { Dialog, DialogTitle, Box, Typography, Button } from "@mui/material";
import { deleteExpense } from "../services/api";

const DeleteWindow = ({selectedExpense,setExpenses,setOpenDeleteDialogue,openDeleteDialogue}) => {
  const handleDelete = async () => {
    try {
      await deleteExpense(selectedExpense._id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== selectedExpense._id)
      );
      setOpenDeleteDialogue(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteCloseDialogue = () => {
    setOpenDeleteDialogue(!openDeleteDialogue);
  };
  return (
    <Dialog onClose={handleDeleteCloseDialogue} open={openDeleteDialogue}>
      <DialogTitle>Are you want to delete this expense?</DialogTitle>
      <Box p={2} textAlign="left">
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Expense
        </Typography>
        <Typography variant="body1" gutterBottom>
          Category: {selectedExpense.category}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Amount: {selectedExpense.amount}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Description: {selectedExpense.description}
        </Typography>
      </Box>
      <Button onClick={handleDelete} variant="contained">
        Yes
      </Button>
    </Dialog>
  );
};
export default DeleteWindow;

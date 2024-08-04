import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ExpenseModal({ open, onClose, children }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="expense-modal-title"
      aria-describedby="expense-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "90%",
            sm: "70%",
            md: "50%",
          },
          bgcolor: "#1A1D23",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "90vh", // Limit max height to prevent overflow
          overflowY: "auto", // Enable scrolling if content overflows
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid grey",
            pb: 1,
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Add Item Details
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Main Content Area */}
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
}

export default ExpenseModal;


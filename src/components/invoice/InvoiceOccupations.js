import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

//Using Hooks.
export default function InvoiceOccupations(props) {
  return props.occupations.map((occupation, index) => {
    return (
      <Button
        variant="contained"
        style={{
          marginRight: "10px",
          marginBottom: "5px",
          textTransform: "none",
          backgroundColor: "#e8e8e9",
        }}
        startIcon={props.canDelete ? <DeleteIcon /> : null}
        key={occupation.id}
        onClick={props.canDelete ? () => props.clicked(index) : null}
      >
        {occupation.name}
      </Button>
    );
  });
}

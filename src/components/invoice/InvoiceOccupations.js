import React from "react";

//Using Hooks.
export default function InvoiceOccupations(props) {
  if (props.canDelete) {
    return props.occupations.map((occupation, index) => {
      return (
        <label as="a" key={occupation} onClick={() => props.clicked(index)}>
          {occupation}
          <icon name="delete" />
        </label>
      );
    });
  } else {
    return props.occupations.map((occupation, index) => {
      return <label key={occupation}>{occupation}</label>;
    });
  }
}

import { useState } from "react";
import { currencyformat } from "@/components/util";

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function Pantry({ title, amount, onEdit, id, onDelete }) {
  const color = getRandomColor(); // Generate random color

  return (
    <div
      className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
      data-aos="fade-up"
    >
      <div className="flex items-center gap-2 flex-1">
        <div
          className="w-[25px] h-[25px] rounded-full"
          style={{ backgroundColor: color }}
        />
        <h4 className="capitalize flex-1"> {title} </h4>
      </div>
      <p className="flex-shrink-0 mx-4"> {currencyformat(amount)} </p>
      <button
        className="btn hover exp-inc-btns btn-outline flex-shrink-0 mx-2"
        onClick={() => onEdit(id)}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(id)}
        className="exp-inc-btns btn hover btn-outline flex-shrink-0"
      >
        Delete
      </button>
    </div>
  );
}

export default Pantry;

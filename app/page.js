"use client";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { currencyformat } from "@/components/util";
import Expenses from "@/components/expense_list";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ExpenseModal from "@/components/modal";
import { db } from "@/firebase";

ChartJS.register(ArcElement, Tooltip, Legend);

const arr = [
  { id: 1, title: "Entertainment", color: "#FF6384", amount: 100 },
  { id: 2, title: "Fuel", color: "#36A2EB", amount: 200 },
  { id: 3, title: "Hello World", color: "#FFCE56", amount: 300 },
  { id: 4, title: "Diesel", color: "#4BC0C0", amount: 400 },
  { id: 5, title: "DSU", color: "#9966FF", amount: 500 },
];

export default function Home() {
  const [openExpenseModal, setOpenExpenseModal] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [siUnit, setSiUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleExpenseModalOpen = () => setOpenExpenseModal(true);
  const handleExpenseModalClose = () => setOpenExpenseModal(false);

  async function addData(name, description, expiryDate, siUnit, quantity, price) {
    try {
      // Use addDoc to add a new document to the "pantry" collection
      const docRef = await addDoc(collection(db, "pantry"), {
        name: name,
        description: description,
        expiryDate: expiryDate,
        siUnit: siUnit,
        quantity: quantity,
        price: price,
      });
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (error) {
      console.log("Error adding document: ", error);
      return false;
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const add = await addData(name, Description, expiryDate, siUnit, quantity, price);
    if (add) {
      setName("");
      setDescription("");
      setExpiryDate("");
      setSiUnit("");
      setQuantity("");
      setPrice("");

      alert ("Data added successfully to DB ");
  };
}

const handleFileChange = (e) => {
  setImage(e.target.files[0]);
};

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-gray-500 text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyformat(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button
          className="hover btn exp-inc-btns"
          onClick={handleExpenseModalOpen}
        >
          Add Items
        </button>
      </section>

      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {arr.map((expense) => (
            <Expenses
              key={expense.id}
              color={expense.color}
              title={expense.title}
              amount={expense.amount}
            />
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-6">
        <h3 className="text-2xl">Stats</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut
            data={{
              labels: arr.map((expense) => expense.title),
              datasets: [
                {
                  label: "Add Items",
                  data: arr.map((expense) => expense.amount),
                  backgroundColor: arr.map((expense) => expense.color),
                  borderColor: [
                    "#18181b",
                    "#792",
                    "#224",
                    "#328",
                    "#874",
                    "#785",
                    "#765",
                  ],
                  borderWidth: 5,
                },
              ],
            }}
          />
        </div>
      </section>

      {/* Expense Modal */}
      <ExpenseModal
        open={openExpenseModal}
        onClose={handleExpenseModalClose}
        submit={handleSubmit}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="name">Item Name</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your item"
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="Description">Description</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="text"
              id="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter details about your item"
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="Expiry Date">Expiry Date</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="datetime-local"
              id="Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="Enter expiry date"
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="si-unit">SI Unit</label>
            <div className="flex items-center gap-4">
              <select
                className="px-4 py-2 bg-slate-600 rounded-xl"
                id="SI Unit"
                value={siUnit}
                onChange={(e) => setSiUnit(e.target.value)}
                style={{ width: "auto" }}
                required
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="g">Gram (g)</option>
                <option value="l">Litre (L)</option>
                <option value="ml">Millilitre (mL)</option>
                <option value="m">Meter (m)</option>
                <option value="cm">Centimeter (cm)</option>
              </select>
              <input
                className="px-4 py-2 bg-slate-600 rounded-xl"
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                style={{ width: "auto" }}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="Price">Price</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="number"
              id="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              style={{ width: "100%" }}
              required
            />
          </div>

          {/* <div className="flex flex-col gap-4">
    <label htmlFor="picture">Add Picture</label>
    <input
      type="file"
      id="picture"
      accept="image/*"
      onChange={handleFileChange}
      className="px-4 py-2 bg-slate-600 rounded-xl"
      required
    />
  </div> */}

        <div className="flex justify-end">
            <button type="Submit" className="btn hover exp-inc-btns" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </ExpenseModal>
    </main>
  );
}
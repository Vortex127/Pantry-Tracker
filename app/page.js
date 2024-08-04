"use client";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc 
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { currencyformat } from "@/components/util";
import Pantry from "@/components/pantry";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ExpenseModal from "@/components/modal";
import { db } from "@/firebase";
import {getRandomColor} from "@/components/pantry"

ChartJS.register(ArcElement, Tooltip, Legend);



export default function Home() {
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [editItem, setEditItem] = useState(null); // For editing item
  const [items, setItems] = useState([]);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [siUnit, setSiUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteData = async (id) => {
    try {
      const docRef = doc(db, "pantry", id);
      await deleteDoc(docRef);
      console.log("Document deleted with ID: ", id);
      return true;
    } catch (error) {
      console.log("Error deleting document: ", error);
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const success = await deleteData(id);
      if (success) {
        // Remove deleted item from state
        setItems(items.filter((item) => item.id !== id));
      }
    }
  };

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pantry"));
      const fetchedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  const handleEditItem = async (id) => {
    try {
      if (!id) {
        setEditItem(null); // For adding new item
        setOpenExpenseModal(true);
        return;
      }

      const docRef = doc(db, "pantry", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const itemData = docSnap.data();
        setEditItem({ id, ...itemData });
        setName(itemData.name || "");
        setDescription(itemData.description || "");
        setExpiryDate(itemData.expiryDate || "");
        setSiUnit(itemData.siUnit || "");
        setQuantity(itemData.quantity || "");
        setPrice(itemData.price || "");
        setOpenExpenseModal(true);
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching item: ", error);
    }
  };

  const handleExpenseModalClose = () => setOpenExpenseModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editItem) {
      const updated = await updateData(editItem.id);
      if (updated) {
        fetchItems(); // Refresh items after update
        handleExpenseModalClose();
        alert("Data updated successfully.");
      }
    } else {
      const added = await addData(
        name,
        description,
        expiryDate,
        siUnit,
        quantity,
        price
      );
      if (added) {
        fetchItems(); // Refresh items after adding
        handleExpenseModalClose();
        alert("Data added successfully to DB.");
      }
    }
  };

  async function addData(
    name,
    description,
    expiryDate,
    siUnit,
    quantity,
    price
  ) {
    try {
      const docRef = await addDoc(collection(db, "pantry"), {
        name,
        description,
        expiryDate,
        siUnit,
        quantity,
        price,
      });
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (error) {
      console.log("Error adding document: ", error);
      return false;
    }
  }

  async function updateData(id) {
    try {
      const docRef = doc(db, "pantry", id);
      await updateDoc(docRef, {
        name,
        description,
        expiryDate,
        siUnit,
        quantity,
        price,
      });
      console.log("Document updated with ID: ", id);
      return true;
    } catch (error) {
      console.log("Error updating document: ", error);
      return false;
    }
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
          onClick={() => handleEditItem(null)} // Open modal for adding new items
        >
          Add Items
        </button>
      </section>

      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {items.map((item) => (
            <Pantry
              key={item.id}
              id={item.id}
              title={item.name}
              amount={item.price}
              onEdit={handleEditItem}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </section>

{/* Charts Section */}
<section className="py-6" id="charts-section">
  <h3 className="text-2xl">Stats</h3>
  <div className="w-1/2 mx-auto">
    <Doughnut
      data={{
        labels: items.map((item) => item.name),
        datasets: [
          {
            label: "Pantry Items",
            data: items.map((item) => item.price),
            backgroundColor: items.map(() => getRandomColor()),
            borderColor: "#000000", // Set border color to black
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
              value={description}
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
                <option value="ml">Millilitre (ml)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="price">Price</label>
            <input
              className="px-4 py-2 bg-slate-600 rounded-xl"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
              onClick={handleSubmit}
            >
              {editItem ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </ExpenseModal>
    </main>
  );
}
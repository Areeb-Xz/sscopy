import React, { useState, useEffect } from "react";

export default function Dashboard() {
  // expense tracker state
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(0);
  const [total, setTotal] = useState(0);

  // calculate total whenever expenses change
  useEffect(() => {
    const totalAmount = expenses.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0
    );
    setTotal(totalAmount);
  }, [expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !expenseAmount || !expenseDate) return; // prevent empty fields

    if (editId) {
      const updatedExpenses = expenses.map((exp) =>
        exp.id === editId
          ? { id: exp.id, name: expenseName, amount: expenseAmount, date: expenseDate }
          : exp
      );
      setExpenses(updatedExpenses);
      setEditId(0);
      setExpenseName("");
      setExpenseAmount("");
      setExpenseDate("");
      return;
    }

    const newExpense = {
      id: `${expenseName}-${Date.now()}`,
      name: expenseName,
      amount: expenseAmount,
      date: expenseDate,
    };
    setExpenses([newExpense, ...expenses]);
    setExpenseName("");
    setExpenseAmount("");
    setExpenseDate("");
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleEdit = (id) => {
    const editExpense = expenses.find((exp) => exp.id === id);
    setExpenseName(editExpense.name);
    setExpenseAmount(editExpense.amount);
    setExpenseDate(editExpense.date);
    setEditId(id);
  };

  return (
    <div className="min-h-screen flex bg-[#F1F4FF] text-purple-800">
      {/* LEFT PANEL */}
      <div className="w-1/4 border-r border-purple-600 p-6 flex flex-col items-start space-y-6">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <button className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg">
          Create Group
        </button>
        <button className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg">
          Add Friends
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-3/4 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-purple-800">
          Expense Tracker
        </h1>

        {/* Expense Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row flex-wrap justify-center w-full max-w-2xl mb-6 gap-3"
        >
          <input
            type="text"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#F1F4FF] text-purple-800 border border-purple-700 focus:outline-none focus:border-purple-400"
          />
          <input
            type="number"
            placeholder="Amount ($)"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#F1F4FF] text-purple-900 border border-purple-700 focus:outline-none focus:border-purple-400"
          />
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#F1F4FF] text-purple-900 border border-purple-700 focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-lg w-full sm:w-auto"
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {/* Expense List */}
        <ul className="w-full max-w-2xl space-y-3 mb-6">
          {expenses.map((exp) => (
            <li
              key={exp.id}
              className="flex justify-between items-center bg-purple-900 bg-opacity-20 border border-purple-700 p-3 rounded-lg"
            >
              <div className="flex justify-between w-full items-center">
                <div>
                  <span className="text-purple-300 text-lg">
                    {exp.name} — <span className="font-semibold">${exp.amount}</span>
                  </span>
                  <p className="text-sm text-purple-400 mt-1">
                    Date: {new Date(exp.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(exp.id)}
                    className="text-sm bg-green-300 hover:bg-green-200 text-black px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-sm bg-red-400 hover:bg-red-300 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Total Display */}
        <div className="w-full max-w-2xl mt-auto bg-purple-900 bg-opacity-20 border border-purple-700 p-4 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-purple-200">
            Total: <span className="text-purple-300">${total}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./Components/styles.css";
import { v4 as uuidv4 } from "uuid";

import Alert from "./Components/Alert";
import Items from "./Components/Items";

const retriveItem = () => {
  const itemsRetrived = JSON.parse(localStorage.getItem("list"));
  if (itemsRetrived) {
    return itemsRetrived;
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [isEditing, setEditng] = useState(false);

  const [editId, setEditId] = useState(null);
  const [listItems, setListItems] = useState(retriveItem());
  const [alert, setAlert] = useState({ state: false, mgs: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      displayAlert(true, "input item", "danger");
    } else if (name && isEditing) {
      displayAlert(true, "edited", "success");
      setListItems(
        listItems.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setEditId(null);
      setEditng(false);
      setName("");
    } else {
      displayAlert(true, "item added", "success");
      const newItem = { id: uuidv4(), title: name };
      setListItems([...listItems, newItem]);

      setName("");
      console.log(listItems);
    }
  };

  const displayAlert = (state = false, mgs = "", type = "") => {
    setAlert({ state, mgs, type });
  };

  const removeItem = (id) => {
    const removed = listItems.filter((item) => item.id !== id);
    displayAlert(true, "item renoved", "danger");
    setListItems(removed);
  };
  const clearItem = () => {
    setListItems([]);
    displayAlert(true, "list emptied", "danger");
  };

  const editItem = (id) => {
    const targetItem = listItems.find((item) => item.id === id);
    setEditng(true);
    setEditId(id);
    setName(targetItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(listItems));
  }, [listItems]);
  return (
    <div className="container">
      <h2 className="header">Groceries</h2>
      <form className="forms" onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="eg. egg"
        />
        <button className="submit_btn" type="submit">
          {isEditing ? "edit" : "submit"}
        </button>
        {alert.state && (
          <Alert {...alert} displayAlert={displayAlert} Items={listItems} />
        )}
      </form>
      {listItems.length > 0 ? (
        <Items
          list={listItems}
          remove={removeItem}
          clear={clearItem}
          edit={editItem}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

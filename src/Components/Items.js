import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Items = ({ list, remove, clear, edit }) => {
  return (
    <section className="section_center">
      <ul className="List_container">
        {list.map((item) => {
          const { id, title } = item;
          return (
            <li key={id}>
              {title}
              <div className="btn_container">
                <FaEdit className="edit" onClick={() => edit(id)} />
                <FaTrash className="delete" onClick={() => remove(id)} />
              </div>
            </li>
          );
        })}
      </ul>
      <button className="clear" onClick={() => clear()}>
        clear all
      </button>
    </section>
  );
};

export default Items;

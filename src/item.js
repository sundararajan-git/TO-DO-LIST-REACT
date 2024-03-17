import React from "react";

const Item = ({ list, deleteHandle, checkhandle, editHandle }) => {
  const getitemHandle = (id) => {
    const getitem = list.find((item) => {
      return item.id === id;
    });
    editHandle(getitem);
  };
  return (
    <div className="items">
      {list &&
        list.map((item) => {
          return (
            <div key={item.id} className="item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => checkhandle(item.id)}
                id={`c${item.id}`}
                className={item.checked ? "checked" : "notchecked"}
              />
              <label htmlFor={`c${item.id}`}>{item.item}</label>
              <button onClick={() => deleteHandle(item.id)} className="btns">
                <i className="fa-solid fa-trash fa-xl"></i>
              </button>
              <button onClick={() => getitemHandle(item.id)} className="btns">
                <i className="fa-solid fa-pen-to-square fa-xl"></i>
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Item;

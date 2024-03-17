import React, { useEffect, useState } from "react";
import Item from "./item";
import apiRequest from "./apiRequest";

const List = () => {
  const API_URL = " http://localhost:3600/item";
  const [list, setList] = useState([]);
  const [item, setItem] = useState({ id: 0, item: "", checked: false });
  // eslint-disable-next-lin
  const [fetchErr, setFetchErr] = useState(null);
  const [edittext, setEdittext] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data Is Not Recived");
        const jsonResponse = await response.json();
        setList(jsonResponse);
        setFetchErr(null);
      } catch (err) {
        setFetchErr(err);
      } finally {
      }
    };
    (async () => await fetchData())();
  }, []);
  const addItemHandle = (e) => {
    setItem({ ...item, item: e.target.value, id: item.length - 1 });
  };
  const addListHandle = async () => {
    if (edittext) {
      const update = list.map((data) => {
        return data.id === edittext.id ? { ...data, item: item.item } : data;
      });
      setList(update);
      const add = update.filter((item) => item.id === edittext.id);
      const patchOption = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({ item: add[0].item }),
      };
      const path = `${API_URL}/${edittext.id}`;
      const result = await apiRequest(path, patchOption);
      setFetchErr(result);
      setEdittext(null);
    } else {
      setItem({ ...item });
      setList([...list, item]);
      setEdittext(null);
      const postOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify(item),
      };
      const result = await apiRequest(API_URL, postOption);
      setFetchErr(result);
    }
    setItem({ ...item, item: "" });
  };
  const deleteHandle = async (id) => {
    const filterd = list.filter((item) => {
      return id !== item.id;
    });
    setList(filterd);
    const deleteOption = {
      method: "DELETE",
    };
    const path = `${API_URL}/${id}`;
    const result = await apiRequest(path, deleteOption);
    setFetchErr(result);
  };
  const checkhandle = async (id) => {
    const check = list.map((item) => {
      return id === item.id ? { ...item, checked: !item.checked } : item;
    });
    setList(check);
    const add = check.filter((item) => item.id === id);
    const patchOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: await JSON.stringify({ checked: add[0].checked }),
    };
    const path = `${API_URL}/${id}`;
    const result = await apiRequest(path, patchOption);
    setFetchErr(result);
  };
  const editHandle = (item) => {
    setEdittext(item);
    setItem({ ...item, item: item.item });
  };

  return (
    <div className="list">
      <div className="headers">
        <input
          type="text"
          name="add-item"
          value={item.item}
          placeholder=" Add item..."
          onChange={(e) => addItemHandle(e)}
        />
        <button onClick={addListHandle}>
          {/* <i className="fa-solid fa-wrench"></i> */}
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div>
        <Item
          list={list}
          deleteHandle={deleteHandle}
          checkhandle={checkhandle}
          editHandle={editHandle}
        />
      </div>
    </div>
  );
};

export default List;

import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const initialPostFormValues = {
  color: '',
  hex: ''
}

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [postFormValues, setPostFormValues] = useState(initialPostFormValues);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(colors.map(color => {
          if (color.id === colorToEdit.id) {
            return res.data;
          }else {
            return color;
          }
        }))
        setEditing(false);
        setColorToEdit(initialColor);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.log(err))
  };

  const addColor = e => {
    e.preventDefault();
    const newColor = {
      color: postFormValues.color,
      code: { hex: postFormValues.hex }
    }
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        updateColors(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleInputChange = e => {
    const { value, name } = e.target;
    setPostFormValues({
      ...postFormValues,
      [name]: value
    });
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input 
            type='text'
            name='color'
            value={postFormValues.color}
            onChange={handleInputChange}
          />
        </label>
        <label>
          hex code:
          <input 
            type='text'
            name='hex'
            value={postFormValues.hex}
            onChange={handleInputChange}
          />
        </label>
        <button>Add color</button>
      </form>
    </div>
  );
};

export default ColorList;

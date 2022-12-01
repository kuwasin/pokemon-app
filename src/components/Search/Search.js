import React from 'react'

function Search({ handleChange, value }) {
  return (
    <input
      type="text"
      placeholder="ポケモンを探す"
      onChange={handleChange}
      value={value}
    />
  );
}

export default Search
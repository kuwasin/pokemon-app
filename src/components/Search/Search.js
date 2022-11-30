import React from 'react'

function Search({ handleChange,  }) {
  return (
    <input
      type="text"
      placeholder="ポケモンを探す"
      onChange={handleChange}
    />
  );
}

export default Search
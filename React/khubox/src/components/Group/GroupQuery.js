import React, { useState } from 'react';

function GroupQuery({ onQuery }) {
  const [keyword, setKeyword] = useState('');

  const handleQuery = () => {
    onQuery(keyword);
  };

  return (
    <div className='groupquery'>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter Group Name"
      />
      <button onClick={handleQuery} className="createButton">Create</button>
    </div>
  );
}

export default GroupQuery;
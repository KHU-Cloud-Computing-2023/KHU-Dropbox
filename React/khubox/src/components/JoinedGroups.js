import React from 'react';

function JoinedGroups({ queryKeyword  }) {
  const joinedGroups = [
    { name: 'KHU', members: 40 },
    { name: 'CloudCompution_H', members: 5 },
    // Personal Groups list data
  ];

  const filteredGroups = queryKeyword
    ? joinedGroups.filter(group => group.name.toLowerCase().includes(queryKeyword.toLowerCase()))
    : joinedGroups;

  return (
    <div className='joinedgroups'>
      <h2>Joined Groups</h2>
      {/*Show joined Groups list*/}
      {filteredGroups.map((group) => (
        <div key={group.name}>
          <h3>{group.name}</h3>
          <p>Members: {group.members}</p>
        </div>
      ))}
    </div>
  );
}

export default JoinedGroups;
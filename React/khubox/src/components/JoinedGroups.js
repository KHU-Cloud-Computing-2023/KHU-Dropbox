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
  <table>
    <thead>
      <tr>
        <th>Group Name</th>
        <th>Members</th>
      </tr>
    </thead>
    <tbody>
      {/* Show joined Groups list */}
      {filteredGroups.map((group) => (
        <tr key={group.name}>
          <td>{group.name}</td>
          <td><p>{group.members}</p></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    
  );
}

export default JoinedGroups;
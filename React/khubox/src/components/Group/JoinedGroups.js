import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function JoinedGroups({ queryKeyword }) {

  // const [joinedGroups, setGroups] = useState([]);

  // useEffect(() => {
  //   // API call to get joined groups list
  //   fetch(`http://localhost:8080/groups`)
  //     .then((res) => res.json())
  //     .then((data) => setGroups(data.JoinedGroups))
  //     .catch((err) => console.log(err));
  // }, []) ;

  // test data
  const joinedGroups = [
    { name: 'KHU', members: 10 },
    { name: 'CloudComputing_H', members: 5 },
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
              <td><Link to={`/GroupPage/${group.name}`}>{group.name}</Link></td>
              <td><p>{group.members}</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default JoinedGroups;
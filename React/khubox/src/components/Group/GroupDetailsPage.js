import React, { useEffect, useState } from 'react';

import '../../css/GroupDetailsPage.css';
import Navbar from '../Navbar';
import InviteForm from './InviteForm';

function GroupDetailsPage({ groupId }) {
  const [files, setFiles] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // get file information
        const filesResponse = await fetch(`/groups/${groupId}/files`);
        const filesData = await filesResponse.json();
        setFiles(filesData);

        // generate fake member data
        const fakeMembersData = [
          { id: 1, name: 'Samue1' },
          { id: 2, name: 'wow123' },
          { id: 3, name: 'gyeongje' },
          { id: 4, name: 'oh1234 ' },
          { id: 5, name: 'gyulim01' },
        ];
        setMembers(fakeMembersData);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleDeleteMember = (memberId) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== memberId)
    );
  };

  return (
    <>
      <Navbar />
      <div className='GroupDetails'>
        <h1>CloudComputing_H</h1>
        <InviteForm />
        <table className="member-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td><p>{member.name}</p></td>
                <td><button onClick={() => handleDeleteMember(member.id)}>
                  Delete
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GroupDetailsPage;
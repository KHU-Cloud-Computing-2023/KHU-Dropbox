import React, { useEffect, useState } from 'react';

import '../../css/GroupDetailsPage.css';
import Navbar from '../Navbar';
import InviteForm from './InviteForm';

function GroupDetailsPage({ groupId }) {
  const [files, setFiles] = useState([]);
  const [members, setMembers] = useState([]);

  // Get file and member information when the component is loaded
  useEffect(() => {
    // Get file and member information from the backend or other data source based on groupId
    // Set the files and members states

    // test code, getting file and member information
    const fetchGroupData = async () => {
      try {
        // get file information
        const filesResponse = await fetch(`/groups/${groupId}/files`);
        const filesData = await filesResponse.json();
        setFiles(filesData);

        // get member information
        // const membersResponse = await fetch(`/groups/${groupId}/getmembers`);
        // const membersData = await membersResponse.json();
        // setMembers(membersData);

        // generate fake member data
        const fakeMembersData = [
          { id: 1, name: 'Page Clement' },
          { id: 2, name: 'Christ' },
          { id: 3, name: 'Arnold' },
          { id: 4, name: 'Samuel ' },
          { id: 5, name: 'Pearson' },
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

    // try {
    //   // Send a request to the backend to delete the member with memberId
    //   await fetch(`http://localhost:8080/group/${groupId}/getmembers/${memberId}`, {
    //     method: 'DELETE',
    //   });

    //   // Update the members state
    //   setMembers((prevMembers) =>
    //     prevMembers.filter((member) => member.id !== memberId)
    //   );
    // };
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
        {/* <hr />
        <h3>Members</h3>
        <hr />
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.name}
              <button onClick={() => handleDeleteMember(member.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul> */}

        {/* <h3>Files:</h3>
        <ul>
            {files.map((file) => (
            <li key={file.id}>{file.name}</li>
            ))}
        </ul> */}
      </div>
    </>
  );
}

export default GroupDetailsPage;
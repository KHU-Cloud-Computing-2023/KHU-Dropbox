import React, { useEffect, useState } from 'react';

import '../css/GroupDetailsPage.css';
import Navbar from './Navbar';
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
        const filesResponse = await fetch(`/api/groups/${groupId}/files`);
        const filesData = await filesResponse.json();
        setFiles(filesData);

        // get member information
        const membersResponse = await fetch(`/api/groups/${groupId}/members`);
        const membersData = await membersResponse.json();
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleDeleteMember = async (memberId) => {
    try {
      // Send a request to the backend to delete the member with memberId
      await fetch(`/api/groups/${groupId}/members/${memberId}`, {
        method: 'DELETE',
      });

      // Update the members state
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId)
      );
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='GroupDetails'>
        <h1>Groups</h1>
        <InviteForm />
          <hr/>
          <h3>Members</h3>
          <hr/>
        <ul>
        {members.map((member) => (
            <li key={member.id}>
              {member.name}
              <button onClick={() => handleDeleteMember(member.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

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
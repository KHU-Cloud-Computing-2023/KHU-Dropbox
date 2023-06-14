import React, { useState } from 'react';

function InviteForm({ groupId }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send invite email here
    // API call to send invite email
    try {
      const response = await fetch(`http://34.234.42.198:8080/groups/${groupId}/addmember`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invite email');
      }

      // update UI state or show success message
      // render UI according to invite result
      const resultData = await response.json();
      if (resultData.success) {
        console.log('Invite sent successfully');
        // 
      } else {
        console.log('Failed to send invite');
        // 
      }
    } catch (error) {
      console.log('Error sending invite email:', error);
      // 
    }
  };

  return (
    <div className='InviteForm'>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit" className="sendButton">Send Invite</button>
        <button className="boardButton">
          <a href="http://44.216.141.210:8081/">게시판
          </a></button>
        <button className="chattingButton"><a href="http://44.216.141.210:8080/">채팅</a></button>
      </form>
    </div>
  );
}

export default InviteForm;
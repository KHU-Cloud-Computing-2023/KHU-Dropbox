import React, { useState } from 'react';

function InviteForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send invite email here
    // API call to send invite email
    try {
      const response = await fetch('http://localhost:3000/invite', {
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
      <button type="submit">Send Invite</button>
    </form>
    </div>
  );
}

export default InviteForm;
import React, { useState } from 'react';

function InviteForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // send invite email here
    // render UI according to invite result
  };

  return (
    <div className='InviteForm'>  
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Send Invite</button>
    </form>
    </div>
  );
}

export default InviteForm;
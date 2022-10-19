import React, { useEffect, useState } from 'react';
import { Message } from '@office-hours/api-interfaces';

export const App = () => {
  const [message, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    void (async function () {
      const response = await fetch('/api').catch(handleErrorResponse)
      if (response?.ok) {
        const message = await response.json()
        setMessage(message)
      }

    })()
    // .then((r) => r.json())
    function handleErrorResponse(err: Error) {
      console.log({ err })
    }
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
      </div>
      <div>{message.message}</div>
    </>
  );
};

export default App;

// import React from 'react'
// import { Container, PostForm } from '../components/index'

// export default function AddPost() {
//   return (
//     <div className='py-8'>
//         <Container>
//             <PostForm/>
//         </Container>
//     </div>
//   )
// }
// src/pages/AddPost.jsx
import React, { useState, useEffect } from 'react';
import { Container, PostForm } from '../components/index'; // Assuming PostForm is correctly exported from components/index.js
import PostFormSkeleton from '../components/PostFormSkeleton'; // Import the skeleton component

export default function AddPost() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200); // Show skeleton for 200ms

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  return (
    <div className='py-8'>
      <Container>
        {loading ? (
          <PostFormSkeleton />
        ) : (
          <PostForm />
        )}
      </Container>
    </div>
  );
}
import React from 'react';
import { Head } from '@inertiajs/react';
import Container from './Container';


function Index({}) {
   
  return (
    <Container>
      <Head title="roles" />

      <div className='flex justify-between'>
        <div>
          <span className='text-gray-400 font-normal text-sm'>Dashboard</span>
          <h1 className='font-ubuntu font-bold'>Dashboard</h1>
        </div>
      </div>
    </Container>
  );
}

export default Index;

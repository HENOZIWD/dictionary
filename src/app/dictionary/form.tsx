'use client';

import { useState } from 'react';
import { IWordData } from './page';

interface IFormProps {
  handleWordSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form(props: IFormProps) {

  return (
    <>
    
    <form method="post" onSubmit={props.handleWordSubmit}>
      <label>
        Word name: <input type="text" name="wordName" />
      </label>
      <br />
      <label>
        Meanings: <input type="text" name="meaning" />
      </label>
      <br />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>

    </>
  )
}
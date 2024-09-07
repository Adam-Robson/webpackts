import React, { useState } from 'react';

interface IFormData {
  username: string;
  email: string;
}

export default function App(): React.ReactElement {
  const [formData, setFormData] = useState<IFormData>({
    username: '',
    email: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((data: IFormData) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.info('Form data submitted:', formData);
    // TODO: Handle form submission
  }

  return (
    <div>
      <h1>TypeScript Webpack Template</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="username"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          data-testid="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button data-testid="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

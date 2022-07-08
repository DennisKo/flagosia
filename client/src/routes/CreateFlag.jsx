import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { TextInput } from '../components/TextInput';
import { createFlag } from '../api';

export function CreateFlag() {
  const [name, setName] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const mutation = useMutation(createFlag, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('flags');
      navigate('/');
    },
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleEnabledChange = (e) => {
    setEnabled(e.target.checked);
  };

  const handleSaveFlag = () => {
    mutation.mutate({
      name,
      value,
      enabled,
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Create new flag</h1>

      <TextInput onChange={handleNameChange} label="Flag name" />
      <Checkbox onChange={handleEnabledChange} label="Enabled" />
      <TextInput onChange={handleValueChange} label="Value" />
      <Button onClick={handleSaveFlag}>Save</Button>
    </div>
  );
}

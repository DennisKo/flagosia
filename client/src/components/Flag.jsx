import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { TextInput } from './TextInput';
import { updateFlag, deleteFlag } from '../api';
import { useEffect } from 'react';

export function Flag({ flag }) {
  const [isEditing, setIsEditing] = useState(false);
  const [flagName, setFlagName] = useState(flag.Name);
  const [enabled, setEnabled] = useState(flag.Enabled);
  const [value, setValue] = useState(flag.Value);

  useEffect(() => {
    setFlagName(flag.Name);
    setValue(flag.Value);
    setEnabled(flag.Enabled);
  }, [flag]);
  const queryClient = useQueryClient();
  const updateMutation = useMutation(updateFlag, {
    onSuccess: () => {
      handleCancel();
      queryClient.invalidateQueries('flags');
    },
  });

  const deleteMutation = useMutation(deleteFlag, {
    onSuccess: () => {
      handleCancel();
      queryClient.invalidateQueries('flags');
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFlagName(flag.Name);
    setValue(flag.Value);
    setEnabled(flag.Enabled);
  };

  const handleSave = () => {
    updateMutation.mutate({
      ID: flag.ID,
      name: flagName,
      value,
      enabled,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      ID: flag.ID,
    });
  };

  const handleNameChange = (e) => {
    setFlagName(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleEnabledChange = (e) => {
    setEnabled(e.target.checked);
  };
  return (
    <li>
      <TextInput
        value={isEditing ? flagName : flag.Name}
        onChange={handleNameChange}
        label="Name"
        disabled={!isEditing}
      />
      <Checkbox
        checked={isEditing ? enabled : flag.Enabled}
        onChange={handleEnabledChange}
        label="Enabled"
        disabled={!isEditing}
      />
      <TextInput
        type="text"
        value={isEditing ? value : flag.Value}
        onChange={handleValueChange}
        label="Value"
        disabled={!isEditing}
      />
      <div className="flex">
        <Button csx="mr-4" onClick={isEditing ? handleCancel : handleEdit}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
        <Button danger onClick={handleDelete}>
          Delete
        </Button>
        <div>
          {isEditing && (
            <Button csx="ml-4" onClick={handleSave} success>
              Save
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

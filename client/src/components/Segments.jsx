import { useRef, useState } from 'react';
import { Button } from './Button';
import { TextInput } from './TextInput';

export function Segments({ segments, isEditing, setSegments }) {
  const handleSaveSegments = (segment, index) => {
    let copySegments = [...segments];
    copySegments[index] = { ...copySegments[index], ...segment };
    setSegments(copySegments);
  };

  return (
    <div>
      <p>Segments</p>
      <div>
        {segments.map((seg, index) => {
          return (
            <Segment
              key={seg.ID}
              seg={seg}
              index={index}
              handleSaveSegments={handleSaveSegments}
              isEditing={isEditing}
            />
          );
        })}
      </div>
    </div>
  );
}

function Segment({ seg, index, handleSaveSegments, isEditing }) {
  const [value, setValue] = useState(seg.Value);
  const [trait, setTrait] = useState(seg.Trait);
  const handleTraitChange = (e) => {
    setTrait(e.target.value);
  };
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleSave = () => {
    handleSaveSegments({ Trait: trait, Value: value }, index);
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <TextInput
          type="text"
          value={trait}
          onChange={handleTraitChange}
          label="Trait"
          disabled={!isEditing}
        />
        <TextInput
          type="text"
          value={value}
          onChange={handleValueChange}
          label="Value"
          disabled={!isEditing}
        />
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={handleSave} csx="mb-4" small success>
          Save Segment
        </Button>
      </div>
    </div>
  );
}

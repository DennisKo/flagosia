import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getFlags } from '../api';
import { Button } from '../components/Button';
import { Flag } from '../components/Flag';

export function FlagList() {
  const flags = useQuery(['flags'], getFlags);

  if (flags.error) {
    <div>Error fetching flags...</div>;
  }

  if (flags.isLoading) {
    return <div>Loading flags...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Flags</h1>
      <ul className="mb-8 w-96">
        {flags.data.data.map((flag) => {
          return (
            <div key={flag.ID}>
              <Flag flag={flag} />
              <hr className="mt-4 mb-3 w-full" />
            </div>
          );
        })}
      </ul>
      <Link to="/create-flag">
        <Button>Create new flag</Button>
      </Link>
    </div>
  );
}

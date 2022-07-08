import { getFlags, isFlagEnabled } from '../lib/flagosia';

export default function Home({ flags, query }) {
  console.log(query);
  const someButton = isFlagEnabled('Some Button', flags);
  const colorButton = isFlagEnabled('Color Button', flags);
  const localFeature = isFlagEnabled('Local feature', flags);
  return (
    <div style={{ padding: '20px' }}>
      <h1>My test page</h1>
      {someButton.isEnabled && (
        <button style={{ color: 'black', padding: '8px' }}>Some Button</button>
      )}
      {colorButton.isEnabled && (
        <button
          style={{
            backgroundColor: colorButton.value ? colorButton.value : 'gray',
            color: 'white',
            padding: '8px',
          }}
        >
          Color Button
        </button>
      )}
      {localFeature.isEnabled && (
        <p>I am only visible for users visiting from Germany.</p>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const flags = await getFlags(query);
  return { props: { flags: flags.data, query } };
}

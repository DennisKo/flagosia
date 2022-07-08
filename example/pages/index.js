import { getFlags, isFlagEnabled } from '../lib/flagosia';

export default function Home({ flags }) {
  const someButton = isFlagEnabled('Some Button', flags);
  const colorButton = isFlagEnabled('Color Button', flags);
  return (
    <div style={{ padding: '20px' }}>
      <h1>My test page</h1>
      {someButton.isEnabled && (
        <button style={{ color: 'black', padding: '8px' }}>Some Button</button>
      )}
      {colorButton.isEnabled && (
        <button
          style={{ backgroundColor: colorButton.value, color: 'white', padding: '8px' }}
        >
          Color Button
        </button>
      )}
    </div>
  );
}

Home.getInitialProps = async () => {
  const flags = await getFlags();
  return { flags: flags.data };
};

import { createRoot } from 'react-dom/client';
import { Icon } from '@blumnai-studio/blumnai-design-system/icons/icon-legacy';

function App() {
  // Legacy entry still supports tuple form (back-compat for consumers on v2.0).
  return <Icon iconType={['system', 'check']} size={24} />;
}

createRoot(document.getElementById('root')!).render(<App />);

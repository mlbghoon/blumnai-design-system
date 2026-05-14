import { createRoot } from 'react-dom/client';
import { Icon, RiCheckLine } from '@blumnai-studio/blumnai-design-system/icons/icon';

function App() {
  return <Icon icon={RiCheckLine} size={24} color="default" />;
}

createRoot(document.getElementById('root')!).render(<App />);

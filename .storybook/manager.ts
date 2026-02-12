import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

// Set Korean as default locale and configure Storybook UI
addons.setConfig({
  theme: themes.light,
});

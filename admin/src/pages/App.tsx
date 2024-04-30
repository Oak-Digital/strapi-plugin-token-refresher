import { AnErrorOccurred } from '@strapi/helper-plugin';
import { Layout } from '@strapi/design-system';
import { Switch, Route } from 'react-router-dom';

import { PLUGIN_ID } from '../pluginId';

import { HomePage } from './HomePage';
import PluginNavigation from '../components/PluginNavigation';
import { TOKEN_TYPES } from '../lib/constants';
import TokenRefresherPage from '../components/TokenRefresherPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout sideNav={<PluginNavigation />}>
        <Switch>
          <Route path={`/plugins/${PLUGIN_ID}`} component={HomePage} exact />
          {TOKEN_TYPES.map((type) => (
            <Route key={type} path={`/plugins/${PLUGIN_ID}/${type}`} component={() => <TokenRefresherPage type={type} key={type} />} />
          ))}
          <Route component={AnErrorOccurred} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  );
};

export { App };

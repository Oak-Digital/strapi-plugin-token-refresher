import { AnErrorOccurred } from '@strapi/helper-plugin';
import { Layout } from '@strapi/design-system';
import { Switch, Route } from 'react-router-dom';

import { PLUGIN_ID } from '../pluginId';

import { HomePage } from './HomePage';
import PluginNavigation from '../components/PluginNavigation';
import { TOKEN_TYPES } from '../lib/constants';
import TokenRefresherPage from '../components/TokenRefresherPage';

const App = () => {
  return (
    <Layout sideNav={<PluginNavigation />}>
      <Switch>
        <Route path={`/plugins/${PLUGIN_ID}`} component={HomePage} exact />
        {TOKEN_TYPES.map((type) => (
          <Route key={type} path={`/plugins/${PLUGIN_ID}/${type}`} component={() => <TokenRefresherPage type={type} key={type} />} />
        ))}
        <Route component={AnErrorOccurred} />
      </Switch>
    </Layout>
  );
};

export { App };

import { SubNav, SubNavHeader, SubNavSection, SubNavLink } from '@strapi/design-system';
import { PLUGIN_ID } from '../pluginId';

const PluginNavigation = () => {
  return (
    <SubNav>
      <SubNavHeader label="Token refresher" value />
      <SubNavSection>
        <SubNavLink to={`/plugins/${PLUGIN_ID}/instagram`}>Instagram</SubNavLink>
      </SubNavSection>
    </SubNav>
  );
};

export default PluginNavigation;

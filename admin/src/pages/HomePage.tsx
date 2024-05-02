import { Main, ContentLayout, Typography, BaseHeaderLayout } from '@strapi/design-system';
import { SubNav } from '@strapi/design-system/v2';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <BaseHeaderLayout title="Token refresher plugin" />
      <ContentLayout>
        <p>
          Welcome to token refresher. This is a simple tool to refresh various of your tokens, so
          that they are up to date on your frontend or other places you may need them.
        </p>
      </ContentLayout>
    </Main>
  );
};

export { HomePage };

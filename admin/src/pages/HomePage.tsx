import { Main, Layout } from '@strapi/design-system';
import { SubNav } from '@strapi/design-system/v2';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      Main page
    </Main>
  );
};

export { HomePage };

import { FC } from 'react';
import {
  Box,
  BaseHeaderLayout,
  HeaderLayout,
  Loader,
  Flex,
  Button,
  ContentLayout,
  Field,
  FieldLabel,
  FieldInput,
  FieldHint,
  FieldError,
} from '@strapi/design-system';
import { TokenTypes } from '../lib/constants';
import { useRefreshToken, useSetToken, useToken } from '../lib/queries/token';
import { Formik } from 'formik';
import { useNotification } from '@strapi/helper-plugin';

type Props = {
  type: TokenTypes;
};

const TokenRefresherPage: FC<Props> = ({ type }) => {
  const { data: token, isLoading: isTokenLoading, isError: isTokenError } = useToken(type);
  const notify = useNotification();
  const setToken = useSetToken();

  const refresh = useRefreshToken();
  const handleRefresh = async () => {
    try {
      await refresh.mutateAsync({ type });
      notify({
        type: 'success',
        title: 'Token refreshed',
      });
    } catch (e) {
      console.error('Could not refresh token', e);
      notify({
        type: 'warning',
        title: 'Error',
        message: 'Could not refresh token.',
      });
    }
  };

  return (
    <>
      <Box>
        <BaseHeaderLayout title={`${type} token`} subtitle="lol" />
      </Box>

      <ContentLayout>
        {isTokenLoading && !isTokenError ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{ token: token?.token ?? '' }}
            onSubmit={async (values) => {
              console.log('submitting', values);
              try {
                await setToken.mutateAsync({
                  type,
                  token: values.token,
                });
                notify({
                  type: 'success',
                  title: 'Token set',
                });
              } catch (e) {
                notify({
                  type: 'warning',
                  title: 'Error',
                  message: 'Could not set token.',
                });
                console.error('Could not set token', e);
              }
            }}
          >
            {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Flex direction="column" alignItems="flex-start" gap={2}>
                    <Field name="token">
                      <Flex direction="column" alignItems="flex-start" gap={1}>
                        <FieldLabel>Token</FieldLabel>
                        <FieldInput
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.token}
                        />
                        <FieldHint />
                        <FieldError />
                      </Flex>
                    </Field>
                    <Button
                      disabled={!token?.token || isSubmitting}
                      onClick={handleRefresh}
                      type="button"
                    >
                      Refresh
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      Save
                    </Button>
                  </Flex>
                </form>
              );
            }}
          </Formik>
        )}
      </ContentLayout>
    </>
  );
};

export default TokenRefresherPage;

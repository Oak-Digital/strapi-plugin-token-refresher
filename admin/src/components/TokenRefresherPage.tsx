import { FC, useEffect, useState } from 'react';
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
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from '@strapi/design-system';
import { TokenTypes } from '../lib/constants';
import { useDeleteToken, useRefreshToken, useSetToken, useToken } from '../lib/queries/token';
import { Formik, useFormik } from 'formik';
import { useNotification } from '@strapi/helper-plugin';
import { ExclamationMarkCircle, Refresh, Trash } from '@strapi/icons';

type Props = {
  type: TokenTypes;
};

const TokenRefresherPage: FC<Props> = ({ type }) => {
  const { data: token, isLoading: isTokenLoading, isError: isTokenError } = useToken(type);
  const notify = useNotification();
  const setToken = useSetToken();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      token: token?.token ?? '',
      cron: token?.cron || '0 1 * * 0',
    },
    onSubmit: async (values) => {
      console.log('submitting', values);
      try {
        await setToken.mutateAsync({
          type,
          token: values.token,
          cron: values.cron,
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
    },
  });

  const { values, resetForm, handleChange, handleBlur, handleSubmit, isSubmitting } = formik;

  useEffect(() => {
    formik.setValues({
      token: token?.token ?? '',
      cron: token?.cron || '0 1 * * 0',
    });
  }, [token]);

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

  const deleteToken = useDeleteToken();
  const handleDelete = async () => {
    try {
      await deleteToken.mutateAsync({ type });
      notify({
        type: 'success',
        title: 'Token deleted',
      });
      resetForm();
    } catch (e) {
      console.error('Could not delete token', e);
      notify({
        type: 'warning',
        title: 'Error',
        message: 'Could not delete token.',
      });
    }
  };

  return (
    <>
      <Box>
        <BaseHeaderLayout
          title={`${type} token`}
          secondaryAction={
            <Flex direction="row" gap={2}>
              <Button
                startIcon={<Refresh />}
                disabled={!token?.token || isSubmitting}
                onClick={handleRefresh}
                variant="tertiary"
                type="button"
              >
                Refresh
              </Button>
              <Button
                startIcon={<Trash />}
                disabled={!token?.token || isSubmitting}
                onClick={() => setIsDeleteDialogOpen(true)}
                type="button"
                variant="danger-light"
              >
                Delete
              </Button>
              <Dialog
                onClose={() => setIsDeleteDialogOpen(false)}
                title="Confirmation"
                isOpen={isDeleteDialogOpen}
              >
                <DialogBody icon={<ExclamationMarkCircle />}>
                  <Flex direction="column" alignItems="center" gap={2}>
                    <Flex justifyContent="center">
                      <Typography id="confirm-description">
                        Are you sure you want to delete this?
                      </Typography>
                    </Flex>
                  </Flex>
                </DialogBody>
                <DialogFooter
                  startAction={
                    <Button onClick={() => setIsDeleteDialogOpen(false)} variant="tertiary">
                      Cancel
                    </Button>
                  }
                  endAction={
                    <Button
                      onClick={() => {
                        setIsDeleteDialogOpen(false);
                        handleDelete();
                      }}
                      variant="danger-light"
                    >
                      Delete
                    </Button>
                  }
                />
              </Dialog>
            </Flex>
          }
        />
      </Box>

      <ContentLayout>
        {isTokenLoading && !isTokenError ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <Flex direction="column" alignItems="flex-start" gap={2}>
              <Field name="token">
                <Flex direction="column" alignItems="flex-start" gap={1}>
                  <FieldLabel>Token</FieldLabel>
                  <FieldInput onChange={handleChange} onBlur={handleBlur} value={values.token} />
                  <FieldHint />
                  <FieldError />
                </Flex>
              </Field>
              <Field name="cron">
                <Flex direction="column" alignItems="flex-start" gap={1}>
                  <FieldLabel>Refresh interval (cron)</FieldLabel>
                  <FieldInput onChange={handleChange} onBlur={handleBlur} value={values.cron} />
                  <FieldHint></FieldHint>
                  <FieldError />
                </Flex>
              </Field>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </Flex>
          </form>
        )}
      </ContentLayout>
    </>
  );
};

export default TokenRefresherPage;

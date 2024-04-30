import { FC } from "react";
import {
  Box, BaseHeaderLayout, HeaderLayout, Loader,
  Flex,
  Button,
  ContentLayout,
  Field, FieldLabel, FieldInput, FieldHint, FieldError
} from "@strapi/design-system";
import { TokenTypes } from "../lib/constants";
import { useToken } from "../lib/queries/token";
import { Formik } from "formik";

type Props = {
  type: TokenTypes
};

const TokenRefresherPage: FC<Props> = ({
  type,
}) => {
  const { data: token, isLoading: isTokenLoading, isError: isTokenError } = useToken(type);
  return (
    <>
      <Box>
        <BaseHeaderLayout title={`${type} token`} subtitle="lol" />
      </Box>

      <ContentLayout>
        {(isTokenLoading && !isTokenError) ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{ token: token?.token ?? '' }}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Flex direction="column" alignItems="flex-start" gap={2}>
                  <Field onChange={handleChange} onBlur={handleBlur} value={values.token} name="token">
                    <Flex direction="column" alignItems="flex-start" gap={1}>
                      <FieldLabel>Token</FieldLabel>
                      <FieldInput />
                      <FieldHint />
                      <FieldError />
                    </Flex>
                  </Field>
                  <Button disabled={!token?.token}>Refresh</Button>
                  <Button type="submit">Save</Button>
                </Flex>
              </form>
            )}
          </Formik>
        )}
      </ContentLayout>

    </>
  );
};

export default TokenRefresherPage;

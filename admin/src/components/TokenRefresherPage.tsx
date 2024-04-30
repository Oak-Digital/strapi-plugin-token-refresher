import { FC } from "react";
import { Box, BaseHeaderLayout, HeaderLayout } from "@strapi/design-system";
import { TokenTypes } from "../lib/constants";

type Props = {
  type: TokenTypes
};

const TokenRefresherPage: FC<Props> = ({
  type,
}) => {
  return (
    <>
      <Box>
        <BaseHeaderLayout title={`${type} token`} subtitle="lol" />
      </Box>


    </>
  );
};

export default TokenRefresherPage;

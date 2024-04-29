import { FC } from "react";
import { Box, HeaderLayout } from "@strapi/design-system";
import { TokenTypes } from "../lib/constants";

type Props = {
  type: TokenTypes
};

const TokenRefresherPage: FC<Props> = ({
  type,
}) => {
  return (
    <Box>
      <HeaderLayout>
        Hello world
      </HeaderLayout>
    </Box>
  );
};

export default TokenRefresherPage;

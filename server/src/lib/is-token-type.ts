import { TOKEN_TYPES, TokenTypes } from "../constants"

export const isTokenType = (type: unknown): type is TokenTypes => {
  return TOKEN_TYPES.includes(type as any);
}

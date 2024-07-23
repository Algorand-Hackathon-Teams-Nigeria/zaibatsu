import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://devapi.zaibatsu.vip/graphql",
  documents: "src/services/graphql/requests/**/*.ts",
  generates: {
    "src/services/graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
    },
  },
};

export default config;

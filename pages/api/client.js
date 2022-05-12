import { SNSClient } from "@aws-sdk/client-sns";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "../../node_modules/@aws-sdk/credential-provider-cognito-identity";

// Set the AWS Region.
const snsClient = new SNSClient({
  region: "ap-south-1",
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({
      region: "ap-south-1",
    }),
    identityPoolId: "ap-south-1:89ca0b7b-18e5-4323-8244-5a1b6730ddd6", // IDENTITY_POOL_ID
  }),
});
// Create SNS service object.
export { snsClient };

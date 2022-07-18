import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_DJPjixKvS",
    ClientId: "1omgcifqkf6rtd4p8n06k3luop"
}

export default new CognitoUserPool(poolData);
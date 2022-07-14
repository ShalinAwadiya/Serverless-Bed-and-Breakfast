import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_32Amft8el",
    ClientId: "29mg6k8cu18dfjjqtsh0unqe57"
}

export default new CognitoUserPool(poolData);
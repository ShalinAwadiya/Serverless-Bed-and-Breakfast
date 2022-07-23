//Add breakfast food items to the cart
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const request = JSON.parse(event.body);
    console.log({ request });

    const updateCart = {
        TableName: "food_cart",
        Key: {
            userSub: request.userSub
        }
    };

    //Check if a cart already exists for the user based on userSub
    const fetchedCartDetails = await dynamoClient.get(updateCart).promise();
    console.log({ fetchedCartDetails });

    let response;
    if (fetchedCartDetails.Item) {
        //Update the existing cart of the user
        let updatedFoodItems = fetchedCartDetails.Item.food;

        //For updating the quantity and price of an existing food item
        let itemExists = false;
        for (var i = 0; i < updatedFoodItems.length; i++) {
            if (updatedFoodItems[i].name === request.food.name) {
                updatedFoodItems[i] = request.food;
                itemExists = true;
                break;
            }
        }

        //For adding the new food item to the cart when it is not already present
        if (!itemExists) {
            updatedFoodItems.push(request.food);
        }

        fetchedCartDetails.Item.food = updatedFoodItems;

        updateCart.Item = fetchedCartDetails.Item;
        updateCart['Item'].totalPrice = parseInt(fetchedCartDetails.Item.totalPrice) + parseInt(request.food.basePrice);

        console.log('Food Cart Params: ', updateCart);

        response = await dynamoClient
            .put(updateCart)
            .promise()
            .then((data) => {
                console.info("Updated cart details in the food_cart table: ", data);
                const response = {
                    statusCode: 200
                };
                response.body = JSON.stringify({ message: 'Updated food cart successfully' });
                return response;
            })
            .catch((err) => {
                console.info("Error: ", err);
            });
    } else {
        //Create a new cart for the user based on userSub
        let food = [];
        food.push(request.food);

        var addToCart = {
            TableName: "food_cart",
            Item: {
                userSub: request.userSub,
                email: request.email,
                totalPrice: request.food.basePrice,
                food: food
            }
        };
        response = await dynamoClient
            .put(addToCart)
            .promise()
            .then((data) => {
                console.info("Added cart details in the food_cart table: ", data);
                const response = {
                    statusCode: 200
                };
                response.body = JSON.stringify({ message: 'Added to cart successfully' });
                return response;
            })
            .catch((err) => {
                console.info("Error: ", err);
            });
    }
    return response;
};
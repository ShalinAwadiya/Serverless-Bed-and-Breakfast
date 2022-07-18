import { Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getUserId, getSession } from "../../localStorage";
import FoodItem from "./FoodItem";
import { v4 as uuidv4 } from 'uuid';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://5ghx6a5sn7gfxlxiwtpv77fsea0lgsas.lambda-url.us-east-1.on.aws?userSub=' + getUserId()
        }).then((res) => {
            console.log({ res });
            if (res.data.Item) {
                setCart(res.data.Item.food);
                setTotalPrice(res.data.Item.totalPrice);
            }
        });
    }, []);

    const handleTotalPriceChange = (total) => {
        console.log({ total })
        setTotalPrice(total);
    }

    const handleCheckout = () => {
        //GET final cart object from food_cart
        axios({
            method: 'get',
            url: 'https://5ghx6a5sn7gfxlxiwtpv77fsea0lgsas.lambda-url.us-east-1.on.aws?userSub=' + getUserId()
        }).then((res) => {
            console.log({ res });
            var request = res.data.Item;
            request['Id'] = uuidv4();
            console.log({ request });

            axios({
                method: 'post',
                url: 'https://ae7tibl2ljkj2cd3emcc6mmqai0ljyuj.lambda-url.us-east-1.on.aws/',
                data: JSON.stringify(request),
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                console.log({ res });
                //Remove the cart from food_cart once the cart order is checkedout and invoice is created
                axios({
                    method: 'delete',
                    url: 'https://ajkfb6262syhrup5x6w5s2j7ri0jyckd.lambda-url.us-east-1.on.aws?userSub=' + getUserId(),
                    data: JSON.stringify(request),
                    headers: { "Content-Type": "application/json" },
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    return (
        <>
            <Container maxWidth="sm" sx={{ p: 4 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6"> CART ITEMS </Typography>
                    <hr />
                    <Grid container spacing={3} sx={{ p: 2 }}>
                        {
                            cart.map((item, index) =>
                                <FoodItem
                                    item={item}
                                    key={index}
                                    cartPrice={totalPrice}
                                    handleTotalPriceMethod={handleTotalPriceChange}
                                />
                            )
                        }
                    </Grid>
                    {
                        cart.length == 0 ?
                            <Typography>
                                No items in the cart
                            </Typography>
                            :
                            <Grid>
                                <Stack direction={'row'} spacing={24}>
                                    <Typography variant="body1" fontWeight={'bold'} sx={{ textAlign: 'left' }}>
                                        TotalPrice
                                    </Typography>
                                    <Typography variant="body1" fontWeight={'bold'} sx={{ textAlign: 'left' }}>
                                        {totalPrice}
                                    </Typography>
                                </Stack>
                                <hr />
                                <Button variant="contained" onClick={handleCheckout}>
                                    Checkout
                                </Button>
                            </Grid>
                    }
                </Paper>
            </Container>
        </>
    );
}
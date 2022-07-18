import { Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getUserId } from "../../localStorage";
import FoodItem from "./FoodItem";

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
                                    totalPrice={totalPrice}
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
                                <Button variant="contained">
                                    Checkout
                                </Button>
                            </Grid>
                    }
                </Paper>
            </Container>
        </>
    );
}
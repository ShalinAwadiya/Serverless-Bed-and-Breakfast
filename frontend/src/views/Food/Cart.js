import { Button, Container, Grid, Paper, Snackbar, Stack, Typography } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getUserId } from "../../localStorage";
import FoodItem from "./CartFoodItems";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://5ghx6a5sn7gfxlxiwtpv77fsea0lgsas.lambda-url.us-east-1.on.aws?userSub=' + getUserId()
        }).then((res) => {
            console.log('Cart fetched for the user: ', res);
            if (res.data.Item) {
                setCart(res.data.Item.food);
                setTotalPrice(res.data.Item.totalPrice);
            }
        });
    }, []);

    const handleCheckout = () => {
        axios({
            method: 'get',
            url: 'https://5ghx6a5sn7gfxlxiwtpv77fsea0lgsas.lambda-url.us-east-1.on.aws?userSub=' + getUserId()
        }).then((res) => {
            setCart([]);
            setOpen(true);

            //Invoice Creation Lambda Function Call
            var request = res.data.Item;
            request['Id'] = uuidv4();
            console.log({ request });

            axios({
                method: 'post',
                url: 'https://ae7tibl2ljkj2cd3emcc6mmqai0ljyuj.lambda-url.us-east-1.on.aws/',
                data: JSON.stringify(request),
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                console.log('Invoice creation response: ', res);
            }).catch((err) => {
                console.log(err);
            })
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
                                    setTotalPrice={setTotalPrice}
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
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Order placed successfully!!!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
}
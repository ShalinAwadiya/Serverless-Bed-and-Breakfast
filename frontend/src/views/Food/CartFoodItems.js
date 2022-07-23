import { Button, Stack } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import { getSession } from '../../localStorage';
import axios from "axios";

export default function FoodItem({ item, totalPrice, setTotalPrice }) {
    const [quantity, setQuantity] = useState(item.quantity)
    const [price, setPrice] = useState(parseInt(item.price));
    const basePrice = item.basePrice;

    const handleIncrement = () => {
        if (quantity != 5) {
            setQuantity(quantity + 1);
            setPrice(price + parseInt(basePrice));
            setTotalPrice(parseInt(totalPrice) + parseInt(basePrice));

            var request = {
                userSub: getSession().idToken.payload.sub,
                email: getSession().idToken.payload.email,
                totalPrice: basePrice,
                food: {
                    name: item.name,
                    basePrice: basePrice,
                    price: price + parseInt(basePrice),
                    quantity: parseInt(quantity) + 1
                }
            }
            axios({
                method: 'post',
                url: 'https://ubrqk7ctmctgdpncdkxxsrhvqe0dwefh.lambda-url.us-east-1.on.aws/',
                data: JSON.stringify(request),
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                console.log('Food Items added or updated to cart: ', res);
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    const handleDecrement = () => {
        if (quantity != 1) {
            setQuantity(quantity - 1);
            setPrice(price - basePrice);
            setTotalPrice(parseInt(totalPrice) - parseInt(basePrice));

            var request = {
                userSub: getSession().idToken.payload.sub,
                email: getSession().idToken.payload.email,
                totalPrice: 0 - basePrice,
                food: {
                    name: item.name,
                    basePrice: basePrice,
                    price: price - basePrice,
                    quantity: quantity - 1
                }
            }
            axios({
                method: 'post',
                url: 'https://ubrqk7ctmctgdpncdkxxsrhvqe0dwefh.lambda-url.us-east-1.on.aws/',
                data: JSON.stringify(request),
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                console.log('Food Items added or updated to cart: ', res);
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    return (
        <Stack direction={'row'} spacing={2}>
            <Stack sx={{ pl: 1, pt: 1, minWidth: 150, maxWidth: 150, textAlign: 'left' }}>
                {item.name}
            </Stack>
            <Stack sx={{ pl: 20, pt: 1, minWidth: 40, maxWidth: 40 }}>
                ${price}
            </Stack>
            <Stack direction={'row'} spacing={0.5} sx={{ pl: 2 }}>
                <Stack>
                    <Button onClick={handleDecrement}>
                        <RemoveCircleOutlineIcon />
                    </Button>
                </Stack>
                <Stack sx={{ pt: 1 }}>
                    {quantity}
                </Stack>
                <Stack>
                    <Button onClick={handleIncrement}>
                        <AddCircleOutlineIcon />
                    </Button>
                </Stack>
            </Stack>
        </Stack >
    )
}
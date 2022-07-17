import axios from "axios";
import { useEffect, useState } from "react";

export default function FoodCart() {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://rueg22wgtxogcfc3dpjv4g6fci0zbjtz.lambda-url.us-east-1.on.aws/'
        }).then((res) => {
            console.log({ res });
            setCart(res.data.Items);
        });
    }, []);

    return (
        <>
            Food cart
        </>
    );
}
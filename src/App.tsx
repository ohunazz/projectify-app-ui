import React from "react";
import { useEffect } from "react";
import { admin } from "./api";
import { Typography, TypographyProps } from "./design-system";

const App = () => {
    useEffect(() => {
        admin
            .forgotPassword("ramazoncode@gmail.com")
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <Typography variant={TypographyProps.variant.h1}>Hello</Typography>;
        </>
    );
};

export default App;

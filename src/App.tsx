import { useState, useId } from "react";
import { Button, Typography, Input, Label } from "./design-system";

const App = () => {
    const [show, setShow] = useState(false);
    const emailId = useId();

    return (
        <div style={{ padding: "100px" }}>
            <Typography variant="h5">Hello</Typography>

            <form onSubmit={() => alert("submitted")}>
                <Input
                    type="email"
                    placeholder="Email"
                    size="md"
                    shape="rounded"
                    labelText="Email"
                />
                <Input
                    placeholder="First Name"
                    size="md"
                    shape="rounded"
                    labelText="First Name"
                />
                <Input
                    placeholder="Last Name"
                    size="md"
                    shape="rounded"
                    labelText="Last Name"
                />
                <Input
                    placeholder="About You"
                    size="lg"
                    type="textarea"
                    shape="rounded"
                    labelText="Tell us about yourself"
                    hintMessage="This is for your password"
                />

                <Button>Submit</Button>
            </form>

            {show && <p>Hello</p>}
        </div>
    );
};

<button type="submit"></button>;

export { App };

import { useState, useId } from "react";
import { Button, Typography, Input, Label, Modal } from "./design-system";

const App = () => {
    const [value, setValue] = useState<string>("");
    const [text, setText] = useState<string>("");

    return (
        <div style={{ padding: "100px" }}>
            <Modal show={true}>
                <Typography variant="h3">Hello</Typography>
                <Input
                    placeholder="Email"
                    type="email"
                    value=""
                    onChange={(char) => console.log(char)}
                    shape="rounded"
                    size="lg"
                />
                <Button color="primary" shape="rounded">
                    Submit
                </Button>
            </Modal>
        </div>
    );
};

export { App };

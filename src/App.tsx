import { useState, useId } from "react";
import { Button, Typography, Input, Label, Modal } from "./design-system";

const App = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div style={{ padding: "100px" }}>
            <Button onClick={() => setShowModal(true)}>Open Modal</Button>
            <Modal show={showModal} position="center">
                <span onClick={() => setShowModal(false)}>X</span>
                <Typography variant="h3">Hello</Typography>
                <Input
                    placeholder="Email"
                    type="email"
                    value=""
                    onChange={(char) => console.log(char)}
                    shape="rounded"
                    size="lg"
                />
                <Button
                    color="primary"
                    shape="rounded"
                    onClick={() => setShowModal(false)}
                >
                    Submit
                </Button>
            </Modal>
        </div>
    );
};

export { App };

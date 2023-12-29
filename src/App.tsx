import { useState, useId } from "react";
import { Button, Typography, Input, Label, Modal } from "./design-system";

const App = () => {
    const [show, setShow] = useState(false);
    const emailId = useId();

    return (
        <div style={{ padding: "100px" }}>
            <Modal show={true}>
                <Typography variant="h5">Hello</Typography>
            </Modal>
        </div>
    );
};

export { App };

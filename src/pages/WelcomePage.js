import { useState } from "react";
import {Container, Form, Button} from "react-bootstrap";


export default function WelcomePage(){

    const [playerName, setPlayerName] = useState("");
    console.log(playerName);

    function storePlayerName(){
        localStorage.setItem("playerName", playerName);
    }

    return(
        <Container fluid className="p-5 bg-warning vh-100">
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="display-3 fw-bold">Guess the Value!</h1>

                <Form className="mt-5">
                    <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center" controlId="exampleForm.ControlInput1">

                        <h3 className="display-6 fw-bold">Please enter your name</h3>

                        <Form.Control type="text" placeholder="Type Here..." onChange={e => setPlayerName(e.target.value)} value={playerName}/>

                        <Button className="px-5 rounded-pill mt-5" onClick={storePlayerName}>ENTER</Button>

                    </Form.Group>
                </Form>

            </Container>
        </Container>
    )
}
import { useState } from "react";
import {Container, Form, Button} from "react-bootstrap";
import { Link } from "react-router-dom";



export default function WelcomePage(){

    const [playerName, setPlayerName] = useState("");
    console.log(playerName);

    function storePlayerName(){
        localStorage.setItem("playerName", playerName);
    }

    return(
        <Container fluid className="p-5 background vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
            <Container className=" glass d-flex flex-column justify-content-center align-items-center border rounded w-50 h-50 border-black border-3 shadow">
                <h1 className="display-3 fw-bold mb-3">Guess the Value!</h1>

                <Form className="mt-4">
                    <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center" controlId="exampleForm.ControlInput1">

                        <h3 className="display-6 mb-3 fw-bold">Please enter your name</h3>

                        <Form.Control type="text" placeholder="Type Here..." onChange={e => setPlayerName(e.target.value)} value={playerName} className=" rounded-pill" size="lg"/>

                        <Button className="px-5 rounded-pill mt-4" onClick={storePlayerName} as={Link} to="/select-level">ENTER</Button>

                    </Form.Group>
                </Form>

            </Container>
        </Container>
    )
}
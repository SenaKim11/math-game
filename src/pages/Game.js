import { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Game(){
    let playerName = localStorage.getItem("playerName");
    let validatePlayer;
    const navigate = useNavigate();

    const [randomNum1, setRandomNum1] = useState(0);
    const [randomNum2, setRandomNum2] = useState(0);
    const [answer, setAnswer] = useState(0);

    useEffect(() => {
        if(playerName == null || playerName == ""){
            validatePlayer = null;
            navigate("/");
        }

        generateRandomNum();
    }, [randomNum1, randomNum2])

    if(playerName == null || playerName == ""){
        return null;
    }
  

    function generateRandomNum(){
        let num1 = Math.floor(Math.random() * 100) + 1;
        setRandomNum1(num1);

        let num2 = Math.floor(Math.random() * 100) + 1;
        setRandomNum2(num2);
    }

    function checkAnswer(){
        
        let correctAnswer = randomNum1 + randomNum2;
        if(Number(answer) === correctAnswer){
            alert("Answer is Correct!")
        }else{
            alert("Oops! Try again!")
        }
    }

    
    return(
        <Container  fluid className="d-flex flex-column m-0 p-0 bg-warning p-5">
        <h1>Welcome, {playerName}!</h1>
            <Container fluid className=" vh-100 d-flex align-items-center justify-content-center">
                <Container fluid className="row d-flex align-items-center justify-content-center " >
                    <Container className="col-6 d-flex align-items-center justify-content-center flex-column border border-dark p-5 rounded-3 shadow" data-aos="flip-left">
                    <h1 className="display-6 fw bold mb-4">STAGE 1</h1>
                        <Container className="col-5 d-flex align-items-center justify-content-center gap-1">

                            <Container className="col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                                <h1 className="display-3 fw-bold">{randomNum1}</h1>
                            </Container>

                            <Container className="col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                                <h1 className="display-3 fw-bold">{randomNum2}</h1>
                            </Container>
                
                        </Container>

                        <Form className="mt-5">
                            <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center" controlId="exampleForm.ControlInput1">


                                <Form.Control type="number" placeholder="TYPE YOUR ANSWER" 
                                value={answer} onChange={e => setAnswer(e.target.value)}  className=" rounded-pill" size="lg"/>

                                <Button className="rounded-pill mt-5 w-100" onClick={checkAnswer}>CHECK</Button>

                                <Button className="rounded-pill mt-1 w-100">NEXT</Button>

                            </Form.Group>
                        </Form>

                        
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
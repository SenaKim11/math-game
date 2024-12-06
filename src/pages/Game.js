import { useEffect, useState } from "react";
import { Container, Button, Form, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Game(){
    let playerName = localStorage.getItem("playerName");
    let validatePlayer;
    const navigate = useNavigate();

    const [randomNum1, setRandomNum1] = useState(0);
    const [randomNum2, setRandomNum2] = useState(0);
    const [answer, setAnswer] = useState(0);
    let [stage, setStage] = useState(1);
    let [score, setScore] = useState(0);
    let [nextBtn, setNextBtn] = useState(true);
    let [checkBtn, setCheckBtn] = useState(false);

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
            Swal.fire({
                title: "CORRECT!",
                message: "Keep it up!",
                icon: "success"
            })
            setAnswer("");
            setStage(stage += 1);
            setScore(score += 5);

            if(stage === 10){
                Swal.fire({
                    title: "YOU MADE IT!",
                    message: "Keep it up!",
                    icon: "success"
                })
                setNextBtn(false);
                setCheckBtn(true);
            }else{
                generateRandomNum();
            }
        }else{
            Swal.fire({
                title: "OOPS!",
                message: "Try again!",
                icon: "error"
            })
        }
    }

    
    return(
        <Container  fluid className="d-flex flex-column m-0 p-0 bg-success p-5 easybg vh-100">
        {/* PLAYER NAME */}
        <Container fluid className="d-flex">
            <h1 className="me-auto fw-bold text-round">Easy round for you, {playerName}!</h1>
            <h1 className="fw-bold text-round">SCORE: {score}</h1>
        </Container>
        
            <Container fluid className=" vh-100 d-flex align-items-center justify-content-center">
                <Container fluid className="row d-flex align-items-center justify-content-center" >
                    <Container className="glass1 col-6 d-flex align-items-center justify-content-center flex-column border border-dark p-5 rounded-3 shadow border-3" data-aos="flip-left">
                    <h1 className="display-6 fw-bold mb-4 text-custom">STAGE {stage}: Addition</h1>
                        <Container className="col-5 d-flex align-items-center justify-content-center gap-1">

                            <Container className="border border-dark border-3 col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                                <h1 className="display-3 fw-bold">{randomNum1}</h1>
                            </Container>

                            <Container className="border border-dark border-3 col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                                <h1 className="display-3 fw-bold">{randomNum2}</h1>
                            </Container>
                
                        </Container>

                        <Form className="mt-5">
                            <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center" controlId="exampleForm.ControlInput1">

                                {
                                    stage === 10 ?
                                    <Form.Control type="number" placeholder="TYPE YOUR ANSWER" 
                                value={answer} onChange={e => setAnswer(e.target.value)}  className=" rounded-pill d-none" size="lg"/>
                                :
                                <Form.Control type="number" placeholder="TYPE YOUR ANSWER" 
                                value={answer} onChange={e => setAnswer(e.target.value)}  className=" rounded-pill border border-dark border-2" size="lg"/>
                                }
                                

                                <Button className="rounded-pill mt-5 w-100 border border-dark border-2 btn-warning" disabled={checkBtn} onClick={checkAnswer}>CHECK</Button>

                                <Button className="rounded-pill mt-1 w-100 border border-dark border-2" disabled={stage < 10} as={Link} to="/next">NEXT</Button>

                            </Form.Group>
                        </Form>

                        
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
import { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Game() {
  let playerName = localStorage.getItem("playerName");
  const navigate = useNavigate();

  const [randomNum1, setRandomNum1] = useState(0);
  const [randomNum2, setRandomNum2] = useState(0);
  const [randomNum3, setRandomNum3] = useState(0); // New random number for addition and subtraction
  const [answer, setAnswer] = useState(0);
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);
  const [nextBtn, setNextBtn] = useState(true);
  const [checkBtn, setCheckBtn] = useState(false);
  const [stageType, setStageType] = useState("+"); // Current operation

  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds

  useEffect(() => {
    if (!playerName) {
      navigate("/");
    }

    generateRandomNum();
    resetTimer(); // Reset the timer when new numbers are generated
  }, [stage]);

  useEffect(() => {
    // Decrease the timer every second
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer); // Cleanup on unmount or when timeLeft changes
    } else {
      handleTimeOut(); // When time runs out
    }
  }, [timeLeft]);

  function handleTimeOut() {
    Swal.fire({
      title: "TIME'S UP!",
      text: "You ran out of time!",
      icon: "error",
    });
    setScore(score > 0 ? score - 5 : 0); // Deduct points if possible
    generateRandomNum(); // Move to the next question
    setAnswer(""); // Reset answer
    setStage(stage + 1);
    resetTimer();
  }

  function resetTimer() {
    setTimeLeft(60); // Reset the timer to 60 seconds
  }

  function generateRandomNum() {
    const operations = ["+", "-", "*", "/"];
    const randomOperation = operations[Math.floor(Math.random() * operations.length)];
    setStageType(randomOperation);

    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;

    setRandomNum1(num1);
    setRandomNum2(num2);

    if (randomOperation === "+") {
      const num3 = Math.floor(Math.random() * 50) + 1;
      setRandomNum3(num3);
    } else if (randomOperation === "-") {
      const num3 = Math.floor(Math.random() * 50) + 1;
      setRandomNum3(num3);
    } else {
      setRandomNum3(0); // No third number for multiplication or division
    }
  }

  function checkAnswer() {
    let correctAnswer;
    switch (stageType) {
      case "+":
        correctAnswer = randomNum1 + randomNum2 + randomNum3;
        break;
      case "-":
        correctAnswer = randomNum1 - randomNum2 - randomNum3;
        break;
      case "*":
        correctAnswer = randomNum1 * randomNum2;
        break;
      case "/":
        correctAnswer = randomNum1 / randomNum2;
        break;
      default:
        correctAnswer = 0;
    }

    if (Number(answer) === correctAnswer) {
      Swal.fire({
        title: "CORRECT!",
        text: "Keep it up!",
        icon: "success",
      });
      setAnswer("");
      setStage(stage + 1);
      setScore(score + 5);
      resetTimer();
      generateRandomNum();
    } else {
      Swal.fire({
        title: "OOPS!",
        text: "Try again!",
        icon: "error",
      });
    }
  }

  return (
    <Container fluid className="hardbg vh-100 d-flex flex-column m-0 p-0 p-5">
      {/* PLAYER NAME */}
      <Container fluid className="d-flex">
        <h1 className="me-auto fw-bold text-round">Medium level for you, {playerName}!</h1>
        <h1 className="fw-bold text-round">SCORE {score}</h1>
      </Container>

      <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
        <Container fluid className="row d-flex align-items-center justify-content-center ">
          <Container className="glass1 col-6 d-flex align-items-center justify-content-center flex-column border border-dark p-5 rounded-3 shadow p-3 border-3" data-aos="flip-left">
            <h2 className="text-custom2 fw-bold mb-5">Operation: {stageType} : Time Left: {timeLeft}s</h2>
            <Container className="col-5 d-flex align-items-center justify-content-center gap-1">
              <Container className="border border-dark border-3 col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                <h1 className="display-3 fw-bold">{randomNum1}</h1>
              </Container>

              <Container className=" border border-dark border-3 col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                <h1 className="display-3 fw-bold">{randomNum2}</h1>
              </Container>

              {(stageType === "+" || stageType === "-") && (
                <Container className="border border-dark border-3 col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                  <h1 className="display-3 fw-bold">{randomNum3}</h1>
                </Container>
              )}
            </Container>

            <Form className="mt-5">
              <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="number"
                  placeholder="TYPE YOUR ANSWER"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="rounded-pill border border-dark border-2"
                  size="lg"
                />

                <Button className="rounded-pill mt-5 w-100 border border-dark border-2 btn-warning" disabled={checkBtn} onClick={checkAnswer}>
                  CHECK
                </Button>

                <Button className="rounded-pill mt-1 w-100 border border-dark border-2" disabled={stage < 10} as={Link} to="/next2">
                  NEXT
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
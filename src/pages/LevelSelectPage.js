import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function LevelSelectPage() {
    const playerName = localStorage.getItem("playerName");
    const navigate = useNavigate();

    useEffect(() => {
        if (!playerName) {
            navigate("/");
        }
    }, [playerName, navigate]);

    if (!playerName) {
        return null;
    }

    return (
        <Container fluid className="background vh-100 d-flex flex-column">
            
            {/* Header */}
            <Container fluid className="d-flex justify-content-center align-items-center mb-5">
                <h1 className="fw-bold mb-5">Welcome, {playerName}!</h1>
            </Container>

            {/* Level Selection */}
            <Container fluid className="d-flex align-items-center justify-content-center flex-grow-2">
                <Container className="col-6 d-flex align-items-center justify-content-center flex-column border p-5 rounded-3 custom-shadow border-3 border-dark">
                    <h1 className="display-6 fw-bold mb-5 text-header">SELECT LEVEL</h1>
                    <div className="col-5 d-flex flex-column gap-3">
                        <Button size="lg" className="rounded-pill w-100" as={NavLink} to="/start">EASY</Button>
                        <Button size="lg" className="rounded-pill w-100 btn-warning" as={NavLink} to="/next">MEDIUM</Button>
                        <Button size="lg" className="rounded-pill w-100 btn-danger" as={NavLink} to="/next1">HARD</Button>
                    </div>
                </Container>
            </Container>
        </Container>
    );
}

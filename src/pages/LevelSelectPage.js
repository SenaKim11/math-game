import { Container, Button } from "react-bootstrap"


export default function LevelSelectPage(){
    return(
        <Container fluid className="d-flex flex-column m-0 p-0 bg-warning p-5">
        <h1>Welcome, {localStorage.getItem("playerName")}!</h1>
            <Container fluid className=" vh-100 d-flex align-items-center justify-content-center">
                <Container fluid className="row d-flex align-items-center justify-content-center">
                    <Container className="col-6 d-flex align-items-center justify-content-center flex-column border border-dark p-5 rounded-3 shadow">
                    <h1 className="display-6 fw bold mb-4">SELECT LEVEL</h1>
                        <Container className="col-5 d-flex align-items-center justify-content-center flex-column">
                            <Button size="lg" className="rounded-pill  w-100">EASY</Button>
                            <Button size="lg" className="rounded-pill  my-3 w-100">MEDIUM</Button>
                            <Button size="lg" className="rounded-pill  w-100 btn-danger">HARD</Button>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}
/* eslint-disable */
import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student"

const Classroom = () => {
    const [student, setStudent] = useState()
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        }).then(res => res.json())
            .then(data => {

                setStudent(data)
                console.log(data)
            })

    }, [])

    const filteredStudents = student ? student.filter(s => {
        const fullName = `${s.name.first} ${s.name.last}`.toLowerCase();
        const major = s.major.toLowerCase();
        const interests = s.interests.map(i => i.toLowerCase());

        return (
            (searchName.trim() === "" || fullName.includes(searchName.trim().toLowerCase())) &&
            (searchMajor.trim() === "" || major.includes(searchMajor.trim().toLowerCase())) &&
            (searchInterest.trim() === "" || interests.some(i => i.includes(searchInterest.trim().toLowerCase())))
        );
    }) : [];

    const studentsPerPage = 24;
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const indexOfFirst = (currentPage - 1) * studentsPerPage;
    const indexOfLast = indexOfFirst + studentsPerPage;
    const showStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName} onChange={(e) => {
                setSearchName(e.target.value);
                setCurrentPage(1);
            }} />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor} onChange={(e) => {
                setSearchMajor(e.target.value);
                setCurrentPage(1);
            }} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={searchInterest} onChange={(e) => {
                setSearchInterest(e.target.value);
                setCurrentPage(1);
            }} />
            <br />
            <Button variant="neutral" onClick={()=>{
                setSearchInterest("");
                setSearchMajor("")
                setSearchName("");
                setCurrentPage(1);
            }}>Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>
                {showStudents.map(s => <Col xs={12} md={6} lg={4} xl={3} key={s.id}><Student {...s} /></Col>)}
            </Row>
        </Container>
        <p>There {filteredStudents.length === 1 ? 'is' : 'are'} {filteredStudents.length} student{filteredStudents.length !== 1 && 's'} matching your search.</p>
        <Pagination>
            <Pagination.Prev onClick={()=>{
                setCurrentPage(currentPage-1)
            }} disabled={currentPage===1||currentPage===0}>Previous</Pagination.Prev>
            {Array.from({ length: totalPages }, (_, i) => (

                <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={()=>{
                setCurrentPage(currentPage+1)
            }} disabled={currentPage===totalPages||currentPage===0}>Next</Pagination.Next>
        </Pagination>
    </div>

}

export default Classroom;
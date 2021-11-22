import React, { useState , useEffect} from "react";
import Layout from "../../components/layout";
import {Form,FormControl,Button,Container,Row,Col,} from "react-bootstrap";
import Input from "../../components/UI/Input/index";
import { isUserLoggedIn, login } from '../../actions';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from "react-router";

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin =(e) => {
        e.preventDefault();


        const user = {
            email , password
        }
        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`}/>
    }

return (
    <Layout>
        <Container>
        <Row style={{marginTop: '50px'}}>
            <Col md={{span: 6 , offset: 3}}>
            <Form onSubmit={userLogin}>

                <Input
                Label = "Email Address"
                type = "email"
                placeholder = "Enter email"
                value = {email}
                onChange = { (e) =>  setEmail(e.target.value)}
                />

                <Input
                Label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange = { (e) => setPassword(e.target.value) }
                />

                <Button variant="primary" type="submit">
                Submit
                </Button>

            </Form>
            </Col>
        </Row>
        </Container>
    </Layout>
    );
};
export default Signin;

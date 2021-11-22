import React, { useState } from 'react';
import Layout from "../../components/layout";
import {Form,FormControl,Button,Container,Row,Col,} from "react-bootstrap";
import Input from "../../components/UI/Input/index"
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions';

const Signup = ()=> {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const userSignup = (e) => {

        e.preventDefault();

        const user = {
            firstName , lastName , email , password
        }
        dispatch(signup(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`}/>
    }
    if(user.loading){
        return <p>Loading!..</p>
    }

    return(
    <Layout>
    <Container>
        {user.message}
        <Row style={{marginTop: '50px'}}>
            <Col md={{span: 6 , offset: 3}}>
            <Form onSubmit={userSignup}>
                <Row>
                    <Col md={6}>
                        <Input
                        Label='First Name'
                        placeholder='First Name'
                        type='text'
                        value={firstName}
                        onChange={ (e) => setFirstName(e.target.value) }
                        />
                    </Col>
                    <Col md={6}>
                        <Input
                            Label='Last Name'
                            placeholder="Last Name"
                            type="text"
                            value={lastName}
                            onChange={ (e) => setLastName(e.target.value) }
                        />
                    </Col>
                </Row>
                <Input
                    Label = "Email Address"
                    type = "email"
                    placeholder = "Enter email"
                    value = {email}
                    onChange = { (e) => setEmail(e.target.value) } 
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
    )
}
export default Signup;
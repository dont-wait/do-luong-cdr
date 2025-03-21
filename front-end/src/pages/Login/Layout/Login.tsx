import "./Login.css";
import LoginForm from "../Components/LoginForm/LoginForm";
import { Container, Row, Col } from "react-bootstrap";

const Login: React.FC = () => {
  return (
    <Container fluid className='login-page d-flex flex-column vh-100 p-4'>
      <Row className='flex-grow-1'>
        <Col
          sm={12}
          md={6}
          className='d-flex justify-content-center align-items-center loginBg'>
          <span className='login-text text-center roboto-900 w-[90%]'>
            TRƯỜNG ĐẠI HỌC CÔNG THƯƠNG THÀNH PHỐ HỒ CHÍ MINH (HUIT)
          </span>
        </Col>
        <Col
          sm={12}
          md={6}
          className='d-flex justify-content-center align-items-center'>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

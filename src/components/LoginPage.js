import React from "react";
import { Form, Button, Input, Space, Checkbox, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils";



class LoginPage extends React.Component {
    formRef = React.createRef();
    state = {
        asHost: false,
        loading: false,
    };

    onFinish = () => {
        console.log("finish form");
    };

    // async and await are a pair
    // we can use it to avoid .then().then()
    handleLogin = async () => {
        // data will be stored in formRef.current
        const formInstance = this.formRef.current;

        try {
            // validate input username and password
            await formInstance.validateFields();
        } catch (error) {
            // if validation is not passed
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            const { asHost } = this.state;
            // formInstance.getFieldValue(true) help us get input data in <Form>
            // login is func in utils
            const resp = await login(formInstance.getFieldsValue(true), asHost);
            // invoke handleLoginSuccess (in App.js) to save token and role in localStorage
            this.props.handleLoginSuccess(resp.token, asHost);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleRegister = async () => {
        const formInstance = this.formRef.current;

        try {
            await formInstance.validateFields();
        } catch (error) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            await register(formInstance.getFieldsValue(true), this.state.asHost);
            message.success("Register Successfully");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleCheckboxOnChange = (e) => {
        this.setState({
            asHost: e.target.checked,
        });
    };


    render() {
        return (
            <div style={{ width: 500, margin: "20px auto" }}>
                <Form ref={this.formRef} onFinish={this.onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            disabled={this.state.loading} // during loading time, disable input function
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            disabled={this.state.loading}
                            placeholder="Password"
                        />
                    </Form.Item>
                </Form>
                {/* Space: Avoid components clinging together and set a unified space. */}
                <Space>
                    <Checkbox
                        disabled={this.state.loading}
                        checked={this.state.asHost}
                        onChange={this.handleCheckboxOnChange}
                    >
                        As Host
                    </Checkbox>
                    <Button
                        onClick={this.handleLogin}
                        disabled={this.state.loading}
                        shape="round"
                        type="primary"
                    >
                        Log in
                    </Button>
                    <Button
                        onClick={this.handleRegister}
                        disabled={this.state.loading}
                        shape="round"
                        type="primary"
                    >
                        Register
                    </Button>
                </Space>
            </div>

        )
    }
}
export default LoginPage
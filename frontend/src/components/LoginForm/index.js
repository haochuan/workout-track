import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.css';
const FormItem = Form.Item;

const LoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input className="loginForm-input" addonBefore={<Icon type="user" />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input className="loginForm-input"  addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
            <div className="loginFrom-createAccount-wrapper">
              <Link to='/signup' className="loginFrom-text-createAccount">
                Register now!
              </Link>
            </div>
        </FormItem>
      </Form>
    );
  },
}));

export default LoginForm;
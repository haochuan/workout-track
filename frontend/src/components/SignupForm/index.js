import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import './style.css';
const FormItem = Form.Item;

const SignupForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input className="signupForm-input" placeholder="Email"/>
          )}
        </FormItem>
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" className="signupForm-input" placeholder="Password" onBlur={this.handlePasswordBlur} />
          )}
        </FormItem>
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" className="signupForm-input" placeholder="Confirm Password"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large" className="signup-form-button">Register</Button>
          <div className="signupFrom-login-wrapper">
            <Link to='/login' className="signupFrom-text-login">
              Login
            </Link>
          </div>
        </FormItem>
      </Form>
    );
  },
}));

export default SignupForm;
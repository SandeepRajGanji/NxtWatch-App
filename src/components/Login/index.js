import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  LoginAppContainer,
  LoginCardForm,
  Logo,
  Label,
  LoginButton,
  ShowPassword,
  Input,
  ShowPasswordContainer,
  ErrorMessage,
} from './styledComponents'

export default class Login extends Component {
  state = {
    showError: false,
    showErrorMsg: '',
    password: '',
    username: '',
  }

  showPassword = () => {
    const show = document.getElementById('password')
    if (show.type === 'password') {
      show.type = 'text'
    } else {
      show.type = 'password'
    }
  }

  setUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  setPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  successResponse = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      path: '/',
      expires: 30,
    })
    history.replace('/')
  }

  failureResponse = errorMsg => {
    this.setState({
      showError: true,
      showErrorMsg: errorMsg,
    })
  }

  validateCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username !== '' && password !== '') {
      const apiUrl = 'https://apis.ccbp.in/login'
      const data = {
        username,
        password,
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
      }
      const response = await fetch(apiUrl, options)
      const responseJson = await response.json()
      if (response.ok === true) {
        this.successResponse(responseJson.jwt_token)
      } else {
        this.failureResponse(responseJson.error_msg)
      }
    }
  }

  render() {
    const {showErrorMsg, showError} = this.state
    return (
      <LoginAppContainer>
        <LoginCardForm onSubmit={this.validateCredentials}>
          <Logo src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
          <Label htmlFor="username" theme="true">
            USERNAME
          </Label>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.setUsername}
          />
          <Label htmlFor="password" theme="true">
            PASSWORD
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.setPassword}
          />
          <ShowPasswordContainer>
            <ShowPassword
              type="checkbox"
              id="showPassword"
              value="Show Password"
              onClick={this.showPassword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </ShowPasswordContainer>

          <LoginButton type="submit"> Login</LoginButton>
          {showError ? <ErrorMessage>*{showErrorMsg}</ErrorMessage> : ''}
        </LoginCardForm>
      </LoginAppContainer>
    )
  }
}

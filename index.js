import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentNumber: "0",
      opFlag: false,
      dotFlag: false
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick = (value) => {
    let currentNumber = this.state.currentNumber;
    let operatorFlag = this.state.opFlag;

    switch (true) {
      case value === "0" ||
        value === "1" ||
        value === "2" ||
        value === "3" ||
        value === "4" ||
        value === "5" ||
        value === "6" ||
        value === "7" ||
        value === "8" ||
        value === "9":
        if (this.state.currentNumber !== "0") {
          currentNumber += value;
          operatorFlag = false;
        } else {
          currentNumber = value;
        }
        break;

      case value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/":
        if (!this.state.opFlag) {
          currentNumber += value;
          operatorFlag = true;
          this.setState({ dotFlag: false });
        } else {
          const newNumber = currentNumber.slice(0, currentNumber.length - 1);
          currentNumber = newNumber;
          currentNumber += value;
        }
        break;

      case value === "clear":
        currentNumber = "0";
        operatorFlag = false;
        this.setState({ dotFlag: false });
        break;

      case value === "deleteOne":
        if (currentNumber.length <= 1) {
          currentNumber = "";
        } else {
          currentNumber = currentNumber.substring(0, currentNumber.length - 1);
        }
        break;

      case value === "=":
        currentNumber = eval(currentNumber);
        operatorFlag = false;
        this.setState({ dotFlag: true });
        break;

      case value === ".":
        if (!this.state.dotFlag) {
          currentNumber += ".";
          this.setState({ dotFlag: true });
        }
        break;

      case value === "%":
        currentNumber = (parseFloat(currentNumber) / 100).toString();
        break;
    }

    this.setState({
      opFlag: operatorFlag,
      currentNumber: currentNumber
    });
  }

  render() {

    return (
      <div className="container">
        <h1>Javascript Calculator</h1>
        <div className="row">
          <div id="calculator">
            <Input id="exepretion" currentNumber={this.state.currentNumber} />
            <Output id="display" currentNumber={this.state.currentNumber} />
            <Clear id="clear" handleClick={this.handleClick} />
            <Operator id="divide" value="/" handleClick={this.handleClick} />
            <Operator id="multiply" value="*" handleClick={this.handleClick} /><br />
            <Button id="seven" value="7" handleClick={this.handleClick} />
            <Button id="eight" value="8" handleClick={this.handleClick} />
            <Button id="nine" value="9" handleClick={this.handleClick} />
            <Operator id="subtract" value="-" handleClick={this.handleClick} /><br />
            <Button id="four" value="4" handleClick={this.handleClick} />
            <Button id="five" value="5" handleClick={this.handleClick} />
            <Button id="six" value="6" handleClick={this.handleClick} />
            <Operator id="add" value="+" handleClick={this.handleClick} /><br />
            <Button id="one" value="1" handleClick={this.handleClick} />
            <Button id="two" value="2" handleClick={this.handleClick} />
            <Button id="three" value="3" handleClick={this.handleClick} />
            <Equals id="equals" value="=" handleClick={this.handleClick} /><br />
            <Button id="zero" value="0" handleClick={this.handleClick} />
            <Button id="decimal" value="." handleClick={this.handleClick} />
            <Button id="percentage" value="%" handleClick={this.handleClick} />
            <Delete id="deleteOne" handleClick={this.handleClick} />
          </div>
        </div>
        <footer className="text-center">
          <span>By. HuDa Qeshta <i className="far fa fa-copyright"></i> 2019</span>
        </footer>
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    return (
      <p id={this.props.id}>{this.props.currentNumber}</p>
    )
  }
}
class Output extends React.Component {
  render() {
    return (
      <p id={this.props.id}>{this.props.currentNumber}</p>
    )
  }
}
class Operator extends React.Component {
  runParentHandleClick = () => {
    this.props.handleClick(this.props.value)
  }
  render() {
    return (
      <button id={this.props.id} onClick={this.runParentHandleClick} className="btn btn-dark btn-lg">{this.props.value}</button>
    )
  }
}

class Button extends React.Component {
  runParentHandleClick = () => {
    this.props.handleClick(this.props.value)
  }
  render() {
    return (
      <button id={this.props.id} onClick={this.runParentHandleClick} className="btn btn-primary btn-lg">{this.props.value}</button>
    )
  }
}

class Clear extends React.Component {
  runParentHandleClick = () => {
    this.props.handleClick(this.props.id)
  }
  render() {
    return (
      <a id={this.props.id} className="btn btn-danger btn-lg" onClick={this.runParentHandleClick}>AC</a>
    )
  }
}

class Delete extends React.Component {
  runParentHandleClick = () => {
    this.props.handleClick(this.props.id)
  }
  render() {
    return (
      <a id={this.props.id} className="btn btn-danger btn-lg" onClick={this.runParentHandleClick}>CE</a>
    )
  }
}

class Equals extends React.Component {
  runParentHandleClick = () => {
    this.props.handleClick(this.props.value)
  }
  render() {
    return (
      <button id={this.props.id} className="btn btn-warning btn-lg" onClick={this.runParentHandleClick}>{this.props.value}</button>
    )
  }
}

render(<App />, document.getElementById('root'));

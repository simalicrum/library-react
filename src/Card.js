import React, {Component} from 'react'

class Card extends Component {
  constructor() {
    super();
    this.sendData = this.sendData.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
  }
  sendData() {
    this.props.removeBookCallback(this.props.keystupid);
  }
  toggleRead() {
    this.props.toggleReadCallback(this.props.keystupid);
  }
  render() {
    return (
      <div className="book-card"><h1>{this.props.title}</h1>
      <h2>{this.props.author}, {this.props.year}</h2>
      <h3>Page count: {this.props.pages}</h3>
      <h3>Book read? {this.props.read}</h3>
      <button onClick={this.sendData}>Remove from Library</button>
      <button onClick={this.toggleRead}>Toggle Read</button></div>
    )
  }
}

export default Card
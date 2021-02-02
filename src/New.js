import React, {Component} from 'react' 

class New extends Component {
  constructor () {
    super();
    this.state = {title: "This is a Title"};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  sendData(event) {
    event.preventDefault();
    this.props.parentCallback(this.state);
    document.querySelectorAll("input").forEach(i => i.value = "");
    document.getElementById("form-thing").className = "hidden";
    document.getElementById("add-book-button").className = "shown";
  }
  render() {
    return (
      <div id ="new-book-form">
        <button id="add-book-button" className="shown" onClick = {() => {
          document.getElementById("form-thing").className = "shown";
          document.getElementById("add-book-button").className = "hidden";
        }}>Add Book</button>
        <form className="hidden" id="form-thing" onSubmit={this.sendData}>
          <label htmlFor="title">Title:</label>
          <br />
          <input type="text" id="title" name="title" onChange={this.handleInputChange} required />
          <br />
          <label htmlFor="author">Author:</label>
          <br />
          <input type="text" id="author" name="author" onChange={this.handleInputChange} required />
          <br />
          <label htmlFor="year">Year of Publishing:</label>
          <br />
          <input type="text" id="year" name="year" onChange={this.handleInputChange} required />
          <br />
          <label htmlFor="pages">Pages:</label>
          <br />
          <input type="text" id="pages" name="pages" onChange={this.handleInputChange} required />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default New
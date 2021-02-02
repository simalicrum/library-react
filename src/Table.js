import React, {Component} from 'react'
import Card from './Card'

class Table extends Component {
  
  cardList() {
    const listItems = this.props.books.map( i => <Card
      title={i.title}
      author={i.author}
      year={i.year}
      pages={i.pages}
      key={i.key}
      keystupid={i.key}
      read={i.read}
      removeBookCallback={this.props.removeBookCallback}
      toggleReadCallback={this.props.toggleReadCallback}/>);
    return listItems;
  }
  render() {
    return (<div id="book-table">{this.cardList()}</div>)
  }
}

export default Table
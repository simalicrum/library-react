import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "./App.css";
import New from "./New";
import Table from "./Table";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "library-74bba.firebaseapp.com",
  databaseURL: "https://library-74bba.firebaseio.com",
  projectId: "library-74bba",
  storageBucket: "library-74bba.appspot.com",
  messagingSenderId: "395958467508",
  appId: "1:395958467508:web:8e429f7dc65ffe8b4b90e1",
  measurementId: "G-0B02RP2HTS",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// Set library demo entries on firestore
db.collection("books")
  .doc("7489")
  .set({
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: "1937",
    pages: "310",
    read: "Yes",
  })
  .then(function () {
    console.log("Document successfully written!");
  })
  .catch(function (error) {
    console.error("Error writing document: ", error);
  });
db.collection("books")
  .doc("100")
  .set({
    title: "Dune",
    author: "Frank Herbert",
    year: "1965",
    pages: "412",
    read: "Yes",
  })
  .then(function () {
    console.log("Document successfully written!");
  })
  .catch(function (error) {
    console.error("Error writing document: ", error);
  });
db.collection("books")
  .doc("6378")
  .set({
    title: "Hyperion",
    author: "Dan Simmons",
    year: "1989",
    pages: "482",
    read: "Yes",
  })
  .then(function () {
    console.log("Document successfully written!");
  })
  .catch(function (error) {
    console.error("Error writing document: ", error);
  });
db.collection("books")
  .doc("467")
  .set({
    title: "Neuromancer",
    author: "William Gibson",
    year: "1984",
    pages: "271",
    read: "Yes",
  })
  .then(function () {
    console.log("Document successfully written!");
  })
  .catch(function (error) {
    console.error("Error writing document: ", error);
  });

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
    this.generateBookIndex = this.generateBookIndex.bind(this);
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.toggleRead = this.toggleRead.bind(this);
  }
  componentDidMount() {
    let books = [];
    db.collection("books")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          books.push({
            title: doc.data().title,
            author: doc.data().author,
            year: doc.data().year,
            pages: doc.data().pages,
            key: doc.id,
            read: doc.data().read,
          });
        });
      })
      .then(() => {
        this.setState({ books: books.slice() });
      });
  }
  generateBookIndex() {
    let newIndex = Math.floor(Math.random() * 9999);
    while (this.state.books.some((i) => i.key) === newIndex) {
      newIndex = Math.floor(Math.random() * 9999);
    }
    return newIndex;
  }
  addBook(childData) {
    const newKey = this.generateBookIndex();
    this.setState({
      books: this.state.books.concat({
        title: childData.title,
        author: childData.author,
        year: childData.year,
        pages: childData.pages,
        key: newKey,
        read: "No",
      }),
    });
    db.collection("books").doc(newKey.toString()).set({
      title: childData.title,
      author: childData.author,
      year: childData.year,
      pages: childData.pages,
      key: newKey,
      read: "No",
    });
  }
  removeBook(childData) {
    this.setState({
      books: this.state.books.filter((i) => i.key !== childData),
    });
    db.collection("books")
      .doc(childData.toString())
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }
  toggleRead(childData) {
    let newBookArray = this.state.books.slice();
    const entry =
      newBookArray[newBookArray.findIndex((i) => i.key === childData)];
    if (entry.read === "Yes") {
      entry.read = "No";
      db.collection("books").doc(entry.key.toString()).set({
        title: entry.title,
        author: entry.author,
        year: entry.year,
        pages: entry.pages,
        key: entry.key,
        read: "No",
      });
    } else {
      entry.read = "Yes";
      db.collection("books").doc(entry.key.toString()).set({
        title: entry.title,
        author: entry.author,
        year: entry.year,
        pages: entry.pages,
        key: entry.key,
        read: "Yes",
      });
    }
    this.setState({ books: newBookArray });
  }
  render() {
    return (
      <div className="App">
        <New parentCallback={this.addBook} />
        <Table
          removeBookCallback={this.removeBook}
          toggleReadCallback={this.toggleRead}
          books={this.state.books}
        />
      </div>
    );
  }
}

export default App;

/* eslint-disable array-callback-return */
import React from "react";
import getInitialData from "../utils/data";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import SearchBox from "./SearchBox";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      filteredData: [],
    }

    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchNotes = this.onSearchNotes.bind(this);
    this.onToggleStatus = this.onToggleStatus.bind(this);
  }

  onAddNotesHandler({ title, body }){
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          }
        ],
        filteredData: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          }
        ],
      }
    })
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState(() => {
      return {
        notes,
        filteredData: notes,
      }
    });
  }

  onSearchNotes(keyword) {
    if (keyword.trim() === '') {
      this.setState((prevState) => {
        return {
          ...prevState.notes,
          filteredData: [],
        }
      });
    }
    const data = this.state.notes.filter((note) => {
      if (note.title.toLowerCase().includes(keyword.toLowerCase())) {
        return note
      }

      if (note.body.toLowerCase().includes(keyword.toLowerCase())) {
        return note
      }
    })

    this.setState((prevState) => {
      return {
        ...prevState.notes,
        filteredData: [...data],
      }
    })
  }

  onToggleStatus(idUpdated) {
    const notes = this.state.notes.map((note) => {
      const { id, archived } = note;
      if (id !== idUpdated) return note;

      if (archived) return {...note, archived: false }
      
      return {...note, archived: true }
    });

    this.setState(() => {
      return {
        notes,
        filteredData: notes,
      }
    });
  }

  render() {    
    const unarchiveNote = (notes) => {
      const data = notes.filter((note) => note.archived === false)

      return data;
    };

    const archivedNote = (notes) => {
      const result = notes.filter((note) => note.archived === true)

      return result;
    };
    
    return (
      <div>
        <header>
          <h1>Contacts App</h1>
          <SearchBox onSearchHandler={this.onSearchNotes} />
        </header>

        <div className="main">
          <div className="card mt-sm mb-md">
            <div className="form_container">
            <NoteInput addNotes={this.onAddNotesHandler} />
            </div>
          </div>
          <div className="d-grid">
            <NoteList headerText='Your Notes' notes={this.state.filteredData.length > 0 ? unarchiveNote(this.state.filteredData) : unarchiveNote(this.state.notes)} onDelete={this.onDeleteHandler} onToggle={this.onToggleStatus} />
            
            <NoteList headerText='Your Archived' notes={this.state.filteredData.length > 0 ? archivedNote(this.state.filteredData) : archivedNote(this.state.notes)} onDelete={this.onDeleteHandler} onToggle={this.onToggleStatus} />
          </div>
        </div>

        <footer>
          <p className="heading">&copy; {new Date().getFullYear()} - <a className="text-white" href="https://github.com/rulhuda" target="_blank" rel="noreferrer">Nurul Huda</a></p>
          <hr className="hr-heading" />
        </footer>
      </div>
    )
  }
  
}

export default NotesApp;
import React from "react";
import DeleteButton from "./DeleteButton";
import ToggleButton from "./ToggleButton";

function NoteItem ({ id, title, body, createdAt, archived, onDelete, onToggle }) {
  const dateConverter = (date) => {
    const newDate = new Date(`${date}`);
    const day = newDate.getDate();
    let month = newDate.getMonth();
    let dayString = newDate.getDay();
    switch (month) {
      case 0:
        month = 'Januari';
        break;
      case 1:
        month = 'Februari';
        break;
      case 2:
        month = 'Maret';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'Mei';
        break;
      case 5:
        month = 'Juni';
        break;
      case 6:
        month = 'Juli';
        break;
      case 7:
        month = 'Agustus';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'Oktober';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'Desember';
        break;
      default:
        break;
    }

    switch (dayString) {
      case 0:
        dayString = 'Minggu';
        break;
      case 1:
        dayString = 'Senin';
        break;
      case 2:
        dayString = 'Selasa';
        break;
      case 3:
        dayString = 'Rabu';
        break;
      case 4:
        dayString = 'Kamis';
        break;
      case 5:
        dayString = 'Jumat';
        break;
      case 6:
        dayString = 'Sabtu';
        break;
      default:
        break;
    }

    const year = newDate.getFullYear();
    const result = `${dayString}, ${day} ${month} ${year}`;

    return result;
     
  }
  return(
    <div className="card-item mt-sm mb-md">
      <div className="card-body">
        <div className="card-body_title">
          <h2>{title}</h2>
          <hr className="hr-title" />
        </div>

        <div className="card-body_desc mt-sm">
          <p>{body}</p>
        </div>

        <p className="text-danger mt-sm">{dateConverter(createdAt)}</p>

      </div>

      <div className="card-footer">
        {archived ? 
        <ToggleButton id={id} className="btn-warning action action-left" defaultValue="Unarchive" onToggle={onToggle} /> : 
        <ToggleButton id={id} className="btn-primary action action-left" defaultValue="Archive" onToggle={onToggle} />}
        
        <DeleteButton id={id} onDelete={onDelete}/>
      </div>
    </div>
  )
}

export default NoteItem;

import React, { useState } from "react"
import Modal from "react-modal"
import EditEntryForm from './EditEntryForm'
Modal.setAppElement('#root')

const EntryTable = (props) => {

  const generateId = () => {
    return Math.floor(Math.random()*1000000)
  }

  return (
    <table className="entries">
      <colgroup>
          <col span="8" className="dataaa"></col>
      </colgroup>
      <thead>
        <tr>
          <th>laji</th>
          <th>pvm.</th>
          <th>pituus cm</th>
          <th>paino kg</th>
          <th>viehe</th>
          <th>paikka</th>
          <th>aika</th>
          <th>saaja</th>
        </tr>
      </thead>
      <tbody>
        {props.entries.map(entry => 
          <Entry 
            key={entry.id} 
            entry={entry} 
            removeEntry={props.removeEntry(entry.id)}
            state={props.state}
            editEntry={props.editEntry(entry.id)}
            initializeStateForEdit={props.initializeStateForEdit(entry)}
            handleFishChange={props.handleEditFishChange}
            handleDateChange={props.handleEditDateChange}
            handleLengthChange={props.handleEditLengthChange}
            handleWeightChange={props.handleEditWeightChange}
            handleLureChange={props.handleEditLureChange}
            handlePlaceChange={props.handleEditPlaceChange}
            handleTimeChange={props.handleEditTimeChange}
            handlePersonChange={props.handleEditPersonChange}
          />
        )}
      </tbody>
    </table>
  )
}

const Entry = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
    // Disables Background Scrolling while the Modal is open
    //document.body.style.overflow = 'hidden';
    //document.body.style.backgroundAttachment = 'scroll';
    
  }  

  const closeModal = () => {
    setModalIsOpen(false)
    // Enables Background Scrolling after the Modal is closed
    //document.body.style.overflow = 'unset';
    //document.body.style.backgroundAttachment = 'fixed';
  }  

  function formatDate(date) {
    const year = date.substring(0,4)
    const month = date.substring(5,7)
    const day = date.substring(8)
    return(`${day}.${month}.${year}`)
  }  

  return (
  <tr>
    <td>{props.entry.fish}</td>
    <td>{formatDate(props.entry.date)}</td>
    <td>{props.entry.length}</td>
    <td>{props.entry.weight}</td>
    <td>{props.entry.lure}</td>
    <td>{props.entry.place}</td>
    <td>{props.entry.time}</td>
    <td>{props.entry.person}</td>
    <td >
      <div className="removeAndEditButtonContainer">
        <button className="button" id="deleteButton" onClick={props.removeEntry}>poista</button>
        <button className="button" id="editButton" onClick={() => {openModal(); props.initializeStateForEdit()}}> muokkaa </button>
      </div>  
      <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(111, 111, 111, 0.8)',
            Zindex: 10
          },
          content: {
            position: 'fixed',
            height: 'fit-content',
            margin: 'auto',
            width: 'fit-content',
            border: '0.2rem solid #000',
            background: '#6a6a6a',
            overflow: 'auto',
            /*WebkitOverflowScrolling: 'touch',*/
            borderRadius: '0.5rem',
            outline: 'none',
            padding: '2.5rem'
          }
        }}
      >
        <h2 style={{color: 'whitesmoke', paddingBottom: '1rem'}}>MUOKKAA SAALISTA</h2>
        <div className='editFormContainer'>
          <EditEntryForm
            state={props.state}
            editEntry={props.editEntry}
            handleFishChange={props.handleFishChange}
            handleDateChange={props.handleDateChange}
            handleLengthChange={props.handleLengthChange}
            handleWeightChange={props.handleWeightChange}
            handleLureChange={props.handleLureChange}
            handlePlaceChange={props.handlePlaceChange}
            handleTimeChange={props.handleTimeChange}
            handlePersonChange={props.handlePersonChange}
            closeModal={closeModal}
          />
        </div>
      </Modal>
    </td>
  </tr>
  )
}

export default EntryTable
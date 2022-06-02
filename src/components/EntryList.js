import React, { useState } from "react"
import Modal from "react-modal"
import InputForm from './InputForm'
Modal.setAppElement('#root')

const EntryList = (props) => {
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
            onSubmit={props.onSubmit(entry.id)}
            handleFishChange={props.handleFishChange}
            handleDateChange={props.handleDateChange}
            handleLengthChange={props.handleLengthChange}
            handleWeightChange={props.handleWeightChange}
            handleLureChange={props.handleLureChange}
            handlePlaceChange={props.handlePlaceChange}
            handleTimeChange={props.handleTimeChange}
            handlePersonChange={props.handlePersonChange}
          />
        )}
      </tbody>
    </table>
  )
}

const Entry = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = (event) => {
    //event.preventDefault()
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

  return (
  <tr>
    <td>{props.entry.fish}</td>
    <td>{props.entry.date}</td>
    <td>{props.entry.length}</td>
    <td>{props.entry.weight}</td>
    <td>{props.entry.lure}</td>
    <td>{props.entry.place}</td>
    <td>{props.entry.time}</td>
    <td>{props.entry.person}</td>
    <td >
      <div className="removeAndEditButtonContainer">
        <button className="button" id="deleteButton" onClick={props.removeEntry}>poista</button>
        <button className="button" id="editButton" /*onClick={openModal}*/> muokkaa </button>
      </div>  
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(111, 111, 111, 0.75)'
          },
          content: {
            position: 'absolute',
            height: 'fit-content',
            margin: 'auto',
            width: 'fit-content',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0.5rem',
            outline: 'none',
            padding: '2rem'
          }
        }}
      >
        <h2>Muokkaa</h2>
        <div className=''>
            <InputForm
              state={props.state}
              onSubmit={props.onSubmit}
              buttonText={'hyväksy muutokset'}
              handleFishChange={props.handleFishChange}
              handleDateChange={props.handleDateChange}
              handleLengthChange={props.handleLengthChange}
              handleWeightChange={props.handleWeightChange}
              handleLureChange={props.handleLureChange}
              handlePlaceChange={props.handlePlaceChange}
              handleTimeChange={props.handleTimeChange}
              handlePersonChange={props.handlePersonChange}
            />
         </div>
        <button className="button" onClick={closeModal}>Peruuta</button>
      </Modal>
    </td>
  </tr>
  )
}

export default EntryList
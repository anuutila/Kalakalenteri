import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import { FaTrash, FaEdit } from 'react-icons/fa';
import { hyphenate } from "hyphen/fi";
import EditEntryForm from './EditEntryForm'
import { formatDate } from "../utils/utils";
Modal.setAppElement('#root')

/**
 * A component for displaying a single entry in the EntryTable.
 */
const Entry = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [hyphenatedLure, setHyphenatedLure] = useState("");
  const [hyphenatedPlace, setHyphenatedPlace] = useState("");
  const MIN_WORD_LENGTH = 10;

  /**
   * Hyphenates the words in the given string if they are longer than the given minimum length.
   * @param {string[]} words - An array of words
   * @param {number} minLength - The minimum length of a word to be hyphenated
   * @returns {string} - The hyphenated string
   */
  const hyphenateWords = async (words, minLength) => {
    const hyphenatedWords = await Promise.all(words.map(async (word) => {
      if (word.length > minLength) {
        return await hyphenate(word)
      } else {
        return word
      }
    }))
    return hyphenatedWords.join(' ')
  }

  useEffect(() => {
    hyphenateWords(props.entry.lure.split(' '), MIN_WORD_LENGTH).then(result => {
      setHyphenatedLure(result)
    })
  }, [props.entry.lure]);

  useEffect(() => {
    hyphenateWords(props.entry.place.split(' '), MIN_WORD_LENGTH).then(result => {
      setHyphenatedPlace(result)
    })
  }, [props.entry.place]);

  const openModal = () => {
    setModalIsOpen(true)
    // Disables Background Scrolling while the Modal is open on small screens
    if (window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    }
  }

  const closeModal = () => {
    setModalIsOpen(false)
    // Enables Background Scrolling after the Modal is closed on small screens
    if (window.innerWidth < 1024) {
      document.body.style.overflow = 'unset';
    }
  }

  function getLatitude() {
    const latitude = props.entry.coordinates.split(', ')[0]
    return latitude
  }

  function getLongitude() {
    const longitude = props.entry.coordinates.split(', ')[1]
    return longitude
  }

  const borderRadius = window.innerWidth < 1024 ? '2rem' : '1rem'

  return (
    <tr>
      <td>{props.entry.fish}</td>
      <td>{props.entry.length}</td>
      <td>{props.entry.weight}</td>
      <td>{hyphenatedLure}</td>
      <td>{hyphenatedPlace}
        <br></br>
        {props.entry.coordinates === '-' ? '' :
          <div className="mapLinkContainer">
            <a id="mapLink" href={`https://www.google.com/maps/search/?api=1&query=${getLatitude()}%2C${getLongitude()}&zoom12`}>kartta</a>
          </div>}
      </td>
      <td>{formatDate(props.entry.date)}</td>
      <td>{props.entry.time}</td>
      <td>{props.entry.person}</td>
      <td >
        <div className="deleteAndEditButtonContainer">
          <button className="button" id="deleteButton" onClick={props.removeEntry}><FaTrash /></button>
          <button className="button" id="editButton" onClick={() => { openModal(); props.initializeStateForEdit() }}><FaEdit /></button>
        </div>
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} closeTimeoutMS={200} onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              position: "fixed",
              display: "flex",
              justifyContent: "center",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0, .8)",
              zIndex: "1000",
              overflowY: "auto"
            },
            content: {
              position: 'absolute',
              zIndex: '1000',
              height: 'fit-content',
              margin: 'auto',
              width: 'fit-content',
              border: '0.2rem solid #888',
              background: '#2a2a2a',
              overflow: 'auto',
              /*WebkitOverflowScrolling: 'touch',*/
              borderRadius: borderRadius,
              outline: 'none',
              padding: '2rem'
            }
          }}
        >
          <h2 id='editEntryTitle'>MUOKKAA TIETOJA</h2>
          <div className='editFormContainer'>
            <EditEntryForm
              editValues={props.editValues}
              entries={props.entries}
              editEntry={props.editEntry}
              handleChange={props.handleChange}
              closeModal={closeModal}
            />
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Entry
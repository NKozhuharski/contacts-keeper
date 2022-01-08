import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "../types";
import axios from "axios";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    filtered: null,
    current: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
// Get Contacts
const getContacts = async (contact) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.get('http://localhost:5000/api/contacts');
    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (err) {
    dispatch({type: CONTACT_ERROR, payload: err.response.data.msg})
  }
};
// Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('http://localhost:5000/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({type: CONTACT_ERROR, payload: err.response.data.msg})
    }
  };
// Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({type: CONTACT_ERROR, payload: err.response.data.msg})
    }
  };
  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };
// Edit Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
// Clear Edit Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
// Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/contacts/${contact._id}`, contact, config);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({type: CONTACT_ERROR, payload: err.response.data.msg})
    }
  };
// Filter Contacts
  const filterContacts = (text) => {
      dispatch({ type: FILTER_CONTACTS, payload: text })
  };
// Clear Filter
  const clearFilter = () => {
      dispatch({ type: CLEAR_FILTER })
  }
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        setCurrent,
        clearCurrent,
        getContacts,
        addContact,
        deleteContact,
        clearContacts,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

import { createEntityAdapter, createSelector, createSlice, EntityState } from '@reduxjs/toolkit'
import { IAction, IContact } from '../../interfaces/indext'

const contactsAdapter = createEntityAdapter()
const contactsData: IContact[] = []
const initialState = contactsAdapter.getInitialState({ contacts: contactsData, currentId:-1, success: false })

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact(state, action:IAction) {
            // debugger
            action.payload.id = state.contacts.length
            action.payload.presentAction = 0
            action.payload.isDeleted = false
            action.payload.submit = false
            state.contacts.push(action.payload)
            state.success = true
    
        },
        editContact(state:any, action:IAction) {
            state.contacts[action.payload.id] = action.payload
            state.success = true
        },
        setCurrentId(state, action) {
            state.currentId = action.payload
        },
        disableSuccess(state) {
            state.success = false
        },
        deleteContact(state, action: IAction) {
            // debugger
            state.contacts[action.payload.id].isDeleted = true
            state.success = true
        }
    }
})

export const { addContact, editContact, setCurrentId, disableSuccess, deleteContact } = contactsSlice.actions

export default contactsSlice.reducer



export const selectContacts = (state:any) => state.contacts.contacts
export const selectCurrentId = (state) => state.contacts.currentId
export const selectSuccess = (state) => state.contacts.success
export const selectContactById = createSelector(selectContacts, selectCurrentId, (conctacts, currentId) => conctacts.find(conctact => conctact.id === currentId))
export const selectActiveContact = createSelector(
    selectContacts,
    (contacts: IContact[]) => contacts.filter((contact) => !contact.isDeleted)
)
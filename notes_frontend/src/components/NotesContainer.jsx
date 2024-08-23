import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';
import Modal from './Modal';

const NotesContainer = () => {
    const [notes, setNotes] = useState([]);
    const [isAdding, setIsAdding] = useState(false); // State to manage visibility of the add note form
    const [selectedNote, setSelectedNote] = useState(null); // State to manage the selected note
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const response = await axios.get('http://localhost:8000/api/notes/');
        setNotes(response.data);
    };

    const handleAddNote = async (title, content) => {
        await axios.post('http://localhost:8000/api/notes/', { title, content });
        fetchNotes();
        setIsAdding(false); // Hide the form after adding a note
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/notes/${id}/`);
        fetchNotes(); // Reload the notes after deletion
    };

    const openModal = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNote(null);
        setIsModalOpen(false);
    };

    // Example function to save the edited note
    const handleSaveNote = async (updatedNote) => {
        await axios.put(`http://localhost:8000/api/notes/${updatedNote.id}/`, updatedNote);
        fetchNotes(); // Reload the notes after updating
        closeModal(); // Close the modal after saving
    };

    return (
        <div className="min-h-screen bg-[#121212] pb-5">
            <div className='flex justify-between bg-[#1E1E1E] py-5 items-center mb-8 px-14 border-b-2 border-[#333333]'>
                <h1 className="text-3xl font-bold text-[#E0E0E0]">Your Notes</h1>
                <button
                    className="text-white relative px-3 pt-1 pb-[5px] bg-[#333333] rounded-full text-center transition-all duration-500
        before:absolute before:top-0 before:left-0 before:w-full before:rounded-full before:h-full before:bg-zinc-400 before:transition-all
        before:duration-300 before:opacity-10 before:hover:opacity-0 before:hover:scale-50
        after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 after:transition-all after:duration-300 after:rounded-full
        after:border after:border-white/50 after:scale-125 after:hover:opacity-100 after:hover:scale-100 uppercase font-bold text-lg"
                    onClick={() => setIsAdding(true)}>
                    + Add
                </button>
            </div>

            {/* Add Note Form */}
            {isAdding && (
                <NoteForm
                    onAddNote={handleAddNote}
                    onCancel={() => setIsAdding(false)}
                />
            )}

            {/* Notes List */}
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 row-auto gap-3 px-14'>
                {notes.reverse().map(note => (
                    <NoteItem
                        key={note.id}
                        note={note}
                        onDelete={handleDelete}
                        onClick={() => openModal(note)}
                    />
                ))}
            </div>

            {/* Modal for showing selected note */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                note={selectedNote}
                onSave={handleSaveNote}
            />
        </div>
    );
};

export default NotesContainer;

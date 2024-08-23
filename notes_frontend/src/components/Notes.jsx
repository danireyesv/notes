import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isAdding, setIsAdding] = useState(false); // State to manage visibility of the add note form

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const response = await axios.get('http://localhost:8000/api/notes/');
        setNotes(response.data);
    };

    const handleAddNote = async () => {
        await axios.post('http://localhost:8000/api/notes/', { title, content });
        setTitle(''); // Clear input fields after adding a note
        setContent('');
        fetchNotes();
        setIsAdding(false); // Hide the form after adding a note
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/notes/${id}/`);
        fetchNotes(); // Reload the notes after deletion
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Notes</h1>

            {/* Notes List Container */}
            <div className="relative max-w-md mx-auto">
                {/* Add Note Button */}
                <button
                    className="absolute top-[-0.5rem] right-[-0.5rem] bg-blue-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center text-xl pb-1"
                    onClick={() => setIsAdding(true)}
                >
                    +
                </button>

                {/* Add Note Form */}
                {isAdding && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Add a New Note</h2>
                            <button
                                onClick={() => setIsAdding(false)}
                                className="text-red-500 hover:text-red-700 transition duration-200"
                            >
                                Close
                            </button>
                        </div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full mb-4 p-2 border border-gray-300 rounded"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Content"
                            className="w-full mb-4 p-2 border border-gray-300 rounded h-24"
                        />
                        <button
                            onClick={handleAddNote}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Add Note
                        </button>
                    </div>
                )}

                {/* Notes List */}
                <ul className="space-y-4">
                    {[...notes].reverse().map(note => (
                        <li key={note.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold text-gray-800">{note.title}</h2>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    className="text-red-500 hover:text-red-700 transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                            <p className="text-gray-600">{note.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notes;

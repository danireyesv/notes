import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const NoteForm = ({ onAddNote, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(''); // State to manage error message
    const [isShaking, setIsShaking] = useState(false); // State to manage shaking animation

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation check
        if (!title || !content) {
            setError('Title and content cannot be empty.');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500); // Reset shaking animation after 0.5s
            return;
        }

        onAddNote(title, content);
        setTitle(''); // Clear input fields after adding a note
        setContent('');
        setError(''); // Clear error message
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
                className={`bg-[#333333] text-[#E0E0E0] p-8 rounded-lg shadow-lg relative max-w-lg w-full mx-4 md:mx-auto ${isShaking ? 'animate-shake' : ''}`}
            >
                <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={onCancel}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Add a New Note</h2>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-500 mb-4">{error}</div>
                        )}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full mb-4 p-2 bg-[#444444] border border-[#555555] rounded text-[#E0E0E0]"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Content"
                            className="w-full mb-4 p-2 bg-[#444444] border border-[#555555] rounded text-[#E0E0E0] h-40 resize-none"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Add Note
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NoteForm;

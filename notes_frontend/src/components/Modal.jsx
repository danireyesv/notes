import React, { useState, useEffect } from 'react';
import '../App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, note, onSave }) => {
    const [title, setTitle] = useState(note ? note.title : '');
    const [content, setContent] = useState(note ? note.content : '');
    const [error, setError] = useState('');
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Reset state when modal is opened
            setTitle(note ? note.title : '');
            setContent(note ? note.content : '');
            setError('');
            setIsShaking(false);
        }
    }, [isOpen, note]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!title || !content) {
            setError('Title and content cannot be empty.');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500); // Reset shaking animation after 0.5s
            return;
        }

        onSave({ ...note, title, content });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
                className={`bg-[#333333] text-[#E0E0E0] p-8 rounded-lg shadow-lg relative max-w-lg w-full mx-4 md:mx-auto ${isShaking ? 'animate-shake' : ''}`}
            >
                <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                        onClose();
                        setError('');
                        setIsShaking(false);
                    }}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Edit Note</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 bg-[#444444] border border-[#555555] rounded text-[#E0E0E0] mb-4"
                        placeholder="Title"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 bg-[#444444] border border-[#555555] rounded text-[#E0E0E0] h-40 resize-none"
                        placeholder="Content"
                    />
                    {error && (
                        <div className="text-red-500 mb-4">{error}</div>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Save
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default Modal;

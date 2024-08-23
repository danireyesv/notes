import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const NoteItem = ({ note, onDelete, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-[#1E1E1E] hover:bg-[#333333] p-4 rounded-lg shadow-md cursor-pointer"
        >
            <div className="flex justify-between items-center my-5">
                <h2 className="text-xl font-bold text-[#E0E0E0]">{note.title}</h2>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up to the parent div
                        onDelete(note.id);
                    }}
                    className="text-[#CF6679] hover:text-red-700 transition duration-200"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            <p className="text-[#B0B0B0] overflow-hidden text-ellipsis whitespace-nowrap">
                {note.content}
            </p>
        </div>
    );
};

export default NoteItem;

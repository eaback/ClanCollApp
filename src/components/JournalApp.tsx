// JournalApp.tsx
import React, { useState } from 'react';

const JournalApp: React.FC = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
        setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
    };

    return (
    <div className="flex flex-col h-full">
        <header className="bg-primary text-tertiary py-4 px-6">
        <h1 className="text-4xl font-bold">My Journal</h1>
        <p className="text-lg">Capture your thoughts, memories, and moments</p>
        </header>
        <main className="flex-1 overflow-y-auto px-6 py-4 bg-secondary">
        <textarea
            className="w-full h-60 border border-tertiary text-tertiary bg-primary rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your journal entry here..."
            value={text}
            onChange={handleTextChange}
        />
        <label className="block mb-4">
            <span className="text-xl font-semibold text-primary">Upload Image</span>
            <input
            type="file"
            accept="image/jpeg, image/png"
            className="mt-2 block w-full border border-tertiary text-tertiary bg-primary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleImageChange}
            />
        </label>
        {image && (
            <div className="mb-6">
            <img src={typeof image === 'string' ? image : ''} alt="Uploaded" className="w-full rounded-md shadow-lg" />
            </div>
        )}
        <button className="bg-primary text-tertiary py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            Save Entry
        </button>
        </main>
        <footer className="bg-primary text-tertiary py-4 px-6 text-center">
            <p className="text-sm">&copy; 2024 My Journal. All rights reserved.</p>
        </footer>
    </div>
    );
};

export default JournalApp;

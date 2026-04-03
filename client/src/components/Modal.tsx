import React, { useState } from "react";
import '../css/Modal.css';

const Modal = ({ isOpen, onClose, onUpdateImage,user_email }:any) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const allowedFormats = ['image/jpeg', 'image/png', 'image/svg+xml'];

    const handleFileChange = (e:any) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && allowedFormats.includes(selectedFile.type)) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setError('');
        } else {
            setFile(null);
            setPreview(null);
            setError('Invalid file format. Only .jpg, .png, .jpeg, .svg files are allowed.');
        }
    };

    const handleUpdateImage = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("email", user_email);

            try {
                const response = await fetch('/api/user/upload-user-image', {
                    method: 'PUT',
                    body: formData,
                });

                const data = await response.json();

                if (data.success) {
                    setSuccess(data.message);
                    onUpdateImage(file);
                    onClose(); // Close the modal after updating the image
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                setError('An error occurred during file upload');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className='modal'>
            <div className='modalContent'>
                <span className='close' onClick={onClose}>&times;</span>
                <h2 className="font-bold text-2xl mb-3">Select an Image</h2>
                <input type="file" onChange={handleFileChange} className="outline-none bg-[custom-pink]" />
                {error && <h4 className="text-red-900 font-medium mt-2">{error}</h4>}
                <h4 className="text-red-900 font-medium">* only .jpg, .png, .jpeg, .svg files are allowed</h4>
                <div className="flex justify-center">{preview && <img src={preview} alt="Preview" className='preview' height='200' width='200' />}</div>
                {file && (
                    <button onClick={handleUpdateImage} className='updateButton'>Update Image</button>
                )}
                {success && <h4 className="text-green-500 font-medium mt-2">{success}</h4>}
            </div>
        </div>
    );
};

export default Modal;

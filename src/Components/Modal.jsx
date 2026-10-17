
import React, { useEffect, useState } from 'react'

const Modal = ({ closeModal, addLead }) => {
    const [services, setServices] = useState([])
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        service: ''
    })

    useEffect(() => {
        fetch('/Data/Services.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Services file not found')
                }
                return response.json()
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    throw new Error('Invalid services data')
                }
                setServices(data)
            })
            .catch(() => {
                setError('Services load nahi ho paayi.')
            })
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.mobile.trim() ||
            !formData.service
        ) {
            setError('Please sabhi fields fill karein.')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Valid email enter karein.')
            return
        }

        if (!/^[0-9]{10}$/.test(formData.mobile)) {
            setError('Mobile number 10 digits ka hona chahiye.')
            return
        }

        if (typeof addLead !== 'function') {
            setError('Lead save function available nahi hai.')
            return
        }

        addLead(formData)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        Add New Lead
                    </h2>

                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-2xl text-gray-500 hover:text-red-600"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        className="w-full rounded-lg border p-3 outline-none focus:border-indigo-500"
                    />

                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="w-full rounded-lg border p-3 outline-none focus:border-indigo-500"
                    />

                    <input
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter 10-digit Mobile"
                        maxLength={10}
                        className="w-full rounded-lg border p-3 outline-none focus:border-indigo-500"
                    />

                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-lg border bg-white p-3 outline-none focus:border-indigo-500"
                    >
                        <option value="">Select Service</option>

                        {services.map((service) => (
                            <option key={service.id} value={service.name}>
                                {service.name}
                            </option>
                        ))}
                    </select>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 py-3 text-white hover:bg-indigo-700"
                    >
                        Add Lead
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Modal

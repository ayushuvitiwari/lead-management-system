import React, { useState, useEffect } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import { MdLeaderboard } from "react-icons/md"
import { FaPlus, FaEye } from "react-icons/fa"
import Modal from '../Components/Modal'

const Lead = () => {
  const [leads, setLeads] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetch('/Data/Leads.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('JSON file not found')
        }
        return response.json()
      })
      .then((data) => setLeads(data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MdLeaderboard className="text-3xl text-indigo-600" />

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Leads
              </h1>
              <p className="text-sm text-gray-500">
                Manage your leads here
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
          >
            <FaPlus />
            Add Lead
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-indigo-50 text-gray-700">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Service</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b" >
                  <td className="p-4">{lead.name}</td>
                  <td className="p-4">{lead.email}</td>
                  <td className="p-4">{lead.mobile}</td>
                  <td className="p-4">{lead.service}</td>
                  <td className="p-4">
                    <button className="rounded bg-orange-700 px-3 py-2 text-white">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}

              {leads.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <Modal closeModal={() => setShowModal(false)} />
        )}

      </div>
    </DashboardLayout>
  )
}

export default Lead
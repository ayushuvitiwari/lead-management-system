import React from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import { MdLeaderboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const Lead = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">

        {/* Header */}
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

          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700">
            <FaPlus />
            Add Lead
          </button>
        </div>

        {/* Lead Table */}
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
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No leads found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Lead

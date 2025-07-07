import React, { useState } from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

const ProductTable = ({ products, onEdit, onDelete }) => {
    const [openDropdownId, setOpenDropdownId] = useState(null)

    const toggleDropdown = (id) => {
        setOpenDropdownId(prev => (prev === id ? null : id))
    }

    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="text-left px-4 py-3 font-semibold text-sm text-gray-600">Image</th>
                        <th className="text-left px-4 py-3 font-semibold text-sm text-gray-600">Name</th>
                        <th className="px-4 py-3 font-semibold text-sm text-gray-600 hidden sm:table-cell">Description</th>
                        <th className="text-end px-4 py-3 font-semibold text-sm text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="border-b hover:bg-gray-50 relative">
                            <td className="px-4 py-3">
                                <img
                                    src={product.productImage}
                                    alt={product.productName}
                                    className="w-16 h-16 object-cover rounded"
                                    <img
                                    src={item.image || ""}
                                    alt={item.name || "No Image"}
                                    className="w-28 h-28 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
                                    }}
                                />

                                />
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-800">{product.productName}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center hidden sm:table-cell">
                                {product.description}
                            </td>

                            <td className="px-4 py-3 text-end relative">
                                {/* Desktop actions */}
                                <div className="hidden sm:flex items-center justify-end space-x-3">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDelete(product._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>

                                {/* Mobile dot menu */}
                                <div className="sm:hidden relative">
                                    <button
                                        onClick={() => toggleDropdown(product._id)}
                                        className="text-gray-600 hover:text-gray-800"
                                    >
                                        <HiDotsVertical size={20} />
                                    </button>

                                    {openDropdownId === product._id && (
                                        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                                            <button
                                                onClick={() => {
                                                    onEdit(product)
                                                    setOpenDropdownId(null)
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100"
                                            >
                                                <FaEdit className="inline-block mr-2" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    onDelete(product._id)
                                                    setOpenDropdownId(null)
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                            >
                                                <FaTrashAlt className="inline-block mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable
import React from "react";

function QueueDisplay({ queue, onUpdateStatus, onRemove }) {

    const getStatusClass = (status) => {
        switch (status) {
            case "waiting":
                return "bg-yellow-100 text-yellow-700";
            case "serving":
                return "bg-green-100 text-green-700";
            case "completed":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Current Queue
            </h2>

            {queue.length === 0 ? (
                <p className="text-gray-500 text-center">
                    No Customer Data
                </p>
            ) : (
                <div className="space-y-4">
                    {queue.map((customer) => (
                        <div
                            key={customer.id}
                            className="flex justify-between items-center border rounded-lg p-4"
                        >
                            {/* Customer Info */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">
                                    {customer.name}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {customer.service}
                                </p>

                                <span
                                    className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(customer.status)}`}
                                >
                                    {customer.status}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                {customer.status === "waiting" && (
                                    <button
                                        onClick={() =>
                                            onUpdateStatus(customer.id, "serving")
                                        }
                                        className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        Serve
                                    </button>
                                )}

                                {customer.status === "serving" && (
                                    <button
                                        onClick={() =>
                                            onUpdateStatus(customer.id, "completed")
                                        }
                                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Complete
                                    </button>
                                )}

                                <button
                                    onClick={() => onRemove(customer.id)}
                                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default QueueDisplay;

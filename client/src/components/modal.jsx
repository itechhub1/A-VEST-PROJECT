import React from 'react'

const modal = ({action,cancel}) => {
    return (
        <div className=" max-w-xs">
            <div className="w-full">
                <h1>Are you sure!</h1>
                <div className="flex justify-center items-center mt-2">
                    <button onClick={()=>cancel()} className="mr-2 bg-red-800 text-white rounded-md p px-4">Cancel</button>
                    <button onClick={()=>action()} className="mr-2 bg-blue-800 text-white rounded-md p px-4">Proceed</button>
                </div>
            </div>
        </div>
    )
}

export default modal

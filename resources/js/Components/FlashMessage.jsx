import React, { useState, useEffect } from 'react'

function FlashMessage({flash}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (flash.message) {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        // Clear the timeout when the component is unmounted or when the message is removed
        return () => clearTimeout(timeoutId);
        }
    }, []);
  return (
    <div>
        {flash.message && (
            <div className="toast z-50">
                <div className={`alert alert-info rounded-md bg-[#263238] text-white ${isVisible ? 'block' : 'hidden'}`}>
                    <span>{flash.message}</span>
                </div>
            </div>
        )}
    </div>
  )
}

export default FlashMessage

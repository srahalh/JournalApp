import React from 'react'

export const NothingSelected = () => {
    return (
        <div className="nothing__main-content animate__animated animate__fadeIn animate__faster">
            <p>
                Select something
                <br />
                <span>Please create a entry!</span>
            </p>
            <i className="far fa-star fa-4x mt-5"></i>
        </div>
    )
}

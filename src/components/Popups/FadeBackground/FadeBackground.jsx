import React from "react";

import "./fadebg.scss";

export default function FadeBackground(props) {
    const handleDisableModal = () => {
        props.handleDisableModal();
    };

    return (
        <>
            <div
                onClick={handleDisableModal}
                className="fade-bg"
                style={{
                    backgroundColor: `${props.bgColor}`,
                    zIndex: `${props.zIndex}`,
                    marginTop: `${props.marginTop}`,
                }}
            ></div>
        </>
    );
}

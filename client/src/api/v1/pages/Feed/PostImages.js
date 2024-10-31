import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import './postImages.scss'


function PostImages({ images, postId }) {
    const [currentIndex, setCurrentIndex] = useState(0);  // Khởi tạo trạng thái cho chỉ số ảnh hiện tại

    // Xử lý khi nhấn vào nút "Next" để chuyển ảnh tiếp theo
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Xử lý khi nhấn vào nút "Previous" để quay lại ảnh trước đó
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="post-images">

            <div
                className="post-images__track"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images?.map((image, idx) => (
                    <div className="post-images__item" key={idx}>
                        <img src={image} alt={`post-image-${idx}`} />
                    </div>
                ))}
            </div>

            <span className='post-images__page-number'>
                {currentIndex+1}/{images?.length}
            </span>

            {images?.length > 1 && <>
                {currentIndex != 0 && <div
                    className="post-images__control post-images__control--left"
                    onClick={handlePrev}
                >
                    <FaArrowLeft />
                </div>}
                
                {currentIndex != images?.length - 1 && <div
                    className="post-images__control post-images__control--right"
                    onClick={handleNext}
                >
                    <FaArrowRight />
                </div>}
            </>}

        </div>
    );
}

export default PostImages;

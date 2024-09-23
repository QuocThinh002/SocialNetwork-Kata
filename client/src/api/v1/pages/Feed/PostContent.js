import React, { useEffect, useRef, useState } from 'react';

const PostContent = ({ content, postId, toggleViews}) => {
    const preRef = useRef(null); // Dùng để tham chiếu đến phần tử <pre>
    const [isOverflow, setIsOverflow] = useState(false); // Trạng thái kiểm tra nếu nội dung vượt quá 4 dòng

    useEffect(() => {
        const checkContentOverflow = () => {
            if (preRef.current) {
                // Lấy chiều cao của một dòng từ CSS
                const lineHeight = parseFloat(getComputedStyle(preRef.current).lineHeight);
                // Tính chiều cao tối đa của 4 dòng
                const maxHeight = lineHeight * 4;
                // Tính chiều cao thực tế của nội dung
                const actualHeight = preRef.current.scrollHeight;
                // Nếu chiều cao thực tế lớn hơn chiều cao 4 dòng, nội dung vượt quá 4 dòng
                setIsOverflow(actualHeight > maxHeight);
            }
        };

        checkContentOverflow(); // Kiểm tra chiều cao khi component lần đầu render
    }, [content]); // Gọi lại useEffect khi content thay đổi

    return (
        <div className="post__content">
            <pre
                ref={preRef}
                className={`post__content__text ${isOverflow ? '' : 'line-clamp-4'}`}
            >
                {content}
            </pre>

        </div>
    );
};

export default PostContent;

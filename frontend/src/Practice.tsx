import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Practice() {
    const [count, setCount] = useState<number | null>(null); // 카운트 상태

    // API에서 현재 카운트 가져오기
    const fetchCount = async () => {
        try {
            const response = await axios.get('http://localhost:8080/v1/api/counter');
            setCount(response.data.count); // 카운트를 상태에 저장
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };

    // API를 통해 카운트 증가
    const incrementCount = async () => {
        try {
            const response = await axios.post('http://localhost:8080/v1/api/counter');
            setCount(response.data.count); // 업데이트된 카운트를 상태에 저장
        } catch (error) {
            console.error('Error incrementing count:', error);
        }
    };

    // 컴포넌트가 마운트될 때 카운트를 가져옴
    useEffect(() => {
        fetchCount();
    }, []);

    return (
        <div>
            <h2>도커 실습 화면</h2>
            <p>현재 카운트: {count !== null ? count : '로딩 중...'}</p>
            <button onClick={incrementCount}>카운트 증가</button>
        </div>
    );
}

export default Practice;

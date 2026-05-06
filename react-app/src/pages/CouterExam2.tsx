import React, { useState } from 'react';

//대부분
//파일 이름과 컴포넌트 이름을 동일하게 사용
//컴포넌트는 반드시 첫글자가 대문자! (안지키면 에러남)
const CouterExam2 = () => {
    const [count, setCount] = useState(0);

    const addCount = () =>{
        let cnt = count +1
        setCount(cnt);
        console.log(`count = ${cnt}`);
    }

    return (
        <div>
            <h3>카운트 계산하기</h3>
            <p> {count} </p>
            <button type='button' onClick={addCount}> 증가 </button>
        </div>
    );
};

export default CouterExam2;

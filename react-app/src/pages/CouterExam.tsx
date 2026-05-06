import React from 'react';

//대부분
//파일 이름과 컴포넌트 이름을 동일하게 사용
//컴포넌트는 반드시 첫글자가 대문자! (안지키면 에러남)
const CouterExam = () => {

    let count = 0;

    const addCount = () =>{
        count = count + 1;
        console.log(`count = ${count}`);
    }

    return (
        <div>
            <p> {count} </p>
            <button type='button' onClick={addCount}> 증가 </button>
        </div>
    );
};

export default CouterExam;

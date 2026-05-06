import React, { useState } from 'react'
import SubComp from './SubComp';

function MainComp() {
    const [toggles, setToggles] = useState(false);

    const ChangeToggles = () => {
        setToggles(!toggles)
    }
  return (
    <div>
        <button type='button' onClick={ChangeToggles}>toggle</button>
        <div>
            {/* 
                html 영역에서 자바스크립트 코드를 쓸 때는 if, while 같은
                스크립트 기본 문법은 사용하지 못합ㄴ디ㅏ.
            */}
            {
                toggles ? <SubComp/> : null
            }
        </div>
    </div>
  )
}

export default MainComp;
import {useEffect, useRef, useState} from "react";
import {doGet, doPost, doReset} from "../api/apiService.js";
import {useDispatch} from "react-redux";
import {USER_INFO_KEY} from "../api/constants.js";

const Colors = () => {
    const inputUserName = useRef('');
    const [availableColors, setAvailableColors] = useState([]);

    const initialUserInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY)) || null;
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
        doGet().then(colors => {
            if (colors) setAvailableColors(Object.values(colors))
        });
    }, [userInfo]);

    const handleSubmit = () => {
        doPost(inputUserName.current.value).then(color => {
            const newInfo = {
                username: inputUserName.current.value,
                color: color
            }

            setUserInfo(newInfo);

            localStorage.setItem(USER_INFO_KEY, JSON.stringify(newInfo));
        });
    }

    const handleReset = () => {
        doReset();
    }

    return (
        <main>
            <h1>Color Assignment App</h1>
            <div className={'colors'}>
                {availableColors?.map((color) => (
                    <div key={color.hex}
                         className={'color'}
                         style={{'backgroundColor': `${color.hex}`}}
                    >{color.color[0]}</div>
                ))}
            </div>
            {/*<button onClick={handleReset}>Reset Colors</button>*/}

            {!userInfo ? (<label>
                <input type="text" ref={inputUserName}/>
                <button onClick={handleSubmit}>Submit</button>
            </label>) : (
                <div>
                    {userInfo?.username} your color is {userInfo.color[0]}
                </div>
            )}

            {userInfo?.color && (<div style={{'backgroundColor': `${userInfo.color?.[1]?.hex}`}}>Thank you</div>)}
        </main>
    );
};
export default Colors;
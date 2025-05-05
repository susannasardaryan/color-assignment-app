import {useEffect, useRef} from "react";
import {doGet, doPost} from "../api/apiService.js";
import {setColors} from "./colorsSlice.js";
import {useDispatch, useSelector} from "react-redux";

const Colors = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        doGet().then(colors => {
            dispatch(setColors(Object.entries(colors)));
        });
    }, []);

    const colors = useSelector(state => state.colors);
    const inputUserName = useRef('');
    const handleSubmit = () => {
        const status = doPost(inputUserName.current.value).then(status => status);
        inputUserName.current.value = '';
    }
    return (
        <>
            {colors?.map((color) => (
                <div key={color[0]} style={{'color': `${color[1]}`}}>{color[0]}</div>
            ))}
            <label>
                <input type="text"  ref={inputUserName} />
                <button onClick={handleSubmit}>Submit</button>
            </label>
            <div>
                Results
            </div>
        </>
    );
};
export default Colors;
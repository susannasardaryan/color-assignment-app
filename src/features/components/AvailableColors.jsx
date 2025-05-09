import {useEffect, useState} from "react";
import {doGet} from "../../api/apiService.js";
import {Flex} from "antd";
import {useSelector} from "react-redux";

const AvailableColors = () => {
    const [availableColors, setAvailableColors] = useState([]);
    const userInfo = useSelector(state => state.userInfo);

    useEffect(() => {
        doGet().then(colors => {
            if (colors) setAvailableColors(Object.values(colors))
        });
    }, [userInfo]);

    return (
        <Flex justify={'center'} align={'center'} className={'colors'}>
            {availableColors?.map((color) => (
                <div key={color.hex}
                     className={'color'}
                     style={{'backgroundColor': `${color.hex}`}}
                >{color.color[0]}</div>
            ))}
            {!availableColors.length && <>No colors available</>}
        </Flex>
    );
};
export default AvailableColors;
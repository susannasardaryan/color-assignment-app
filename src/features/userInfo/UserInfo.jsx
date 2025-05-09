import {useDispatch, useSelector} from 'react-redux'
import {StorageService} from "../../services/StorageService.js";
import {USER_INFO_KEY} from "../../api/constants.js";
import {setUserInfo} from "./userInfoSlice.js";
import {doPost} from "../../api/apiService.js";
import {useState, useEffect} from "react";
import {Button, Flex, Input, Modal} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {checkUserInfo} from "../../utils/checkUserInfo.js";

export const UserInfo = () => {
    const dispatch = useDispatch();
    const initialUserInfo = checkUserInfo();
    const userInfo = useSelector((state) => state.userInfo);

    const [username, setUsername] = useState("");

    useEffect(() => {
        if (initialUserInfo) {
            dispatch(setUserInfo(initialUserInfo));
        }
    }, []);

    const handleSubmit = async () => {
        const color = await doPost(username);

        const newInfo = {
            username,
            color,
        };

        dispatch(setUserInfo(newInfo));

        Modal.success({
            content: `Thank You, ${newInfo.username} your color is ${newInfo.color[0]}`,
        });
        setUsername('');

        StorageService.setItem(USER_INFO_KEY, newInfo);
    }

    return (
        <>
            {userInfo?.username ? (
                <div className='result'>
                    {userInfo.username}, your color is:
                    <div className="result-color" style={{
                        backgroundColor: `${userInfo.assignedColor?.[1]?.hex}`
                    }}>
                        {userInfo?.assignedColor?.[0]}
                    </div>
                </div>
            ) : (
                <Flex>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    />
                    <Button onClick={handleSubmit} color="cyan" variant="solid">
                        Submit
                    </Button>
                </Flex>
            )}
        </>
    )
}

export default UserInfo;
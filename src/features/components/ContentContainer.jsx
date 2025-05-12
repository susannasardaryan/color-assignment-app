import {doGet, doReset} from "../../api/apiService.js";
import AvailableColors from "./AvailableColors.jsx";
import IsAdminModal from "./IsAdminModal.jsx";
import UserInfo from "../userInfo/UserInfo.jsx";
import {StorageService} from "../../services/StorageService.js";
import {Button, Flex, message} from "antd";
import {useEffect, useState} from "react";
import {PARTICIPANTS_PATH} from "../../api/constants.js";
import {useDispatch, useSelector} from "react-redux";
import {setAdmin, setUserInfo} from "../userInfo/userInfoSlice.js";

const ContentContainer = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.userInfo.isAdmin);
    const userInfo = useSelector(state => state.userInfo);

    const [results, setResults] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();

    const handleReset = () => {
        doReset().then((results) => {
            dispatch(setUserInfo({username: '', assignedColor: null}));

            messageApi.open({
                type: 'success',
                content: 'Successfully reset',
                duration: 3,
            });
        }).catch((err) => {
            messageApi.open({
                type: 'error',
                content: err.message,
                duration: 3,
            });
        });

        setResults([])
    }

    useEffect(() => {
        dispatch(setAdmin(StorageService.getItem("isAdmin")));

        doGet(PARTICIPANTS_PATH).then(participants => {
            if (participants) {
                setResults(Object.values(participants))
            }
        })
    }, [userInfo]);


    return (
        <main>
            {contextHolder}
            <h1>Color Assignment App</h1>
            {isAdmin && <Button onClick={handleReset}>Reset AvailableColors</Button>}

            <AvailableColors/>
            <UserInfo/>

            {isAdmin == null && <IsAdminModal/>}

            {isAdmin && <Flex vertical={true} gap={'small'}>
                <h3 className={'result'}>Results: {results.length}</h3>
                {results?.map(result => <div key={result.id}>
                        {result.name} -
                        <div style={{
                            backgroundColor: `${result.hex}`,
                        }} className={'result-color'}>
                            {result?.color}
                        </div>
                    </div>
                )}
            </Flex>}
        </main>
    )
}

export default ContentContainer
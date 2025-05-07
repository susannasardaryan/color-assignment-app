import {doGet, doReset} from "../../api/apiService.js";
import AvailableColors from "./AvailableColors.jsx";
import IsAdminModal from "./IsAdminModal.jsx";
import UserInfo from "../userInfo/UserInfo.jsx";
import {StorageService} from "../../services/StorageService.js";
import {Button, Flex} from "antd";
import {useEffect, useState} from "react";
import {PARTICIPANTS_PATH} from "../../api/constants.js";

const ContentContainer = () => {
    const isAdmin = StorageService.getItem("isAdmin");
    const [results, setResults] = useState([]);

    const handleReset = () => {
        doReset();
        setResults([]);
    }

    useEffect(() => {
        doGet(PARTICIPANTS_PATH).then(participants => {
            if (participants) {
                setResults(Object.values(participants))
            }
        })
    }, []);

    return (
        <main>
            <h1>Color Assignment App</h1>
            {isAdmin && <Button onClick={handleReset}>Reset AvailableColors</Button>}

            <AvailableColors/>
            <UserInfo/>

            {isAdmin == null && <IsAdminModal/>}

            {isAdmin && <Flex vertical={true} gap={'small'}>
                Results: {results.length}
                {results?.map(result => <div key={result.id}>
                        {result.name} -
                        <div style={{
                            backgroundColor: `${result.hex}`,
                        }} class={'result-color'}>
                            {result?.color}
                        </div>
                    </div>
                )}
            </Flex>}
        </main>
    )
}

export default ContentContainer
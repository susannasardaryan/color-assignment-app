import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { ADMIN_PASSWORD } from "../../api/constants.js";
import { setAdmin } from "../userInfo/userInfoSlice.js";
import { useDispatch } from "react-redux";
import {StorageService} from "../../services/StorageService.js";

const IsAdminModal = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleInitialOk = () => {
        setShowPasswordForm(true);
    };

    const handleCancel = () => {
        setOpen(false);
        StorageService.setItem('isAdmin', false);
    };

    const handleSubmit = () => {
        if (password === ADMIN_PASSWORD) {
            dispatch(setAdmin(true));
            StorageService.setItem('isAdmin', true);
        }else{
            StorageService.setItem('isAdmin', false);
        }

        setOpen(false);
    };

    return (
        <Modal
            centered
            open={open}
            onOk={showPasswordForm ? handleSubmit : handleInitialOk}
            onCancel={handleCancel}
            okText={showPasswordForm ? "Submit" : "Yes"}
        >
            {!showPasswordForm ? (
                <p>Are you an admin?</p>
            ) : (
                <form  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <label>
                        <span>Admin Password:</span>
                        <Input.Password
                            placeholder="Input password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible,
                            }}
                        />
                    </label>
                </form>
            )}
        </Modal>
    );
};

export default IsAdminModal;

import React, {useState} from "react";
import { useNavigate } from 'react-router';


function LogIn() {
    const nevigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        // 로그인 처리 로직 구현
        // 로그인 성공 시 메인 페이지로 이동하도록
        // 추후 서버에서 api를 받아서 처리하는 부분도 추가해야함
        e.preventDefault();
        console.log(id, password);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id, password})
            });
            if (response.ok) {
                nevigate('/'); // 이동할 페이지 수정해야함
            }
            else {
                console.log('로그인 실패');
            }
        }
        catch (error) {
            console.log('로그인 오류:', error);
        }
    }

    const handleSignupClick = () => {
        // 회원가입 페이지로 이동
        nevigate('/signup');
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
            <div class="title">KHUBox</div>
            <div>
                <input
                    type="text"
                    id="id"
                    value={id}
                    placeholder="ID"
                    class="loginForm"
                    onChange={handleIdChange}
                />
            </div>
            <div>
                <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                class="loginForm"
                onChange={handlePasswordChange} />
            </div>
            <button type="submit" class="loginClick">Log in</button>
            </form>
            <p>Don't have an account? <a href="#" onClick={handleSignupClick}>Sign up</a></p>
        </div>
      );
}

export default LogIn;
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import "../css/Login.css";

function LogIn() {
    const navigate = useNavigate();
    const [loginId, setId] = useState("");
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
        console.log(loginId, password);
        try {
            if (loginId === "")
            {
                return alert("ID를 입력해주세요");
            }
            else if (password === "")
            {
                return alert("Password를 입력해주세요");
            }
            const response = await fetch('/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({loginId, password})
            });
            console.log(JSON.stringify({loginId, password}))
            if (response.ok) {
                navigate('/files'); // 이동할 페이지 수정해야함
            }
            else if (response.status === 400)
            {
                return alert("ID, Password가 비어있습니다.");
            }
            else if (response.status === 401)
            {
                return alert("존재하지 않는 ID입니다.");
            }
            else if (response.status === 402)
            {
                return alert("Password가 틀립니다.");
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
        navigate('/signup');
    }

    return (
        <div class="Login">
            <div class="title">KHUBox</div>
            <form onSubmit={handleSubmit} class="loginForm">
                <div class="loginInput">
                        <input
                            type="text"
                            id="id"
                            value={loginId}
                            placeholder="ID"
                            className="id"
                            onChange={handleIdChange}
                        />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Password"
                            className="password"
                            onChange={handlePasswordChange}/>
                </div>
                <button type="submit" class="loginClick">Login</button>
            </form>
            <p>Don't have an account? <a href="/#" onClick={handleSignupClick}>Sign up</a></p>
        </div>
      );
}

export default LogIn;

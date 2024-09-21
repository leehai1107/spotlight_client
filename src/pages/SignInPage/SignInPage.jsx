import React, { useState } from "react";

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (event) => {
        event.preventDefault();
        // Handle sign-in logic here, perhaps calling an API
        console.log("Signing in with:", email, password);
    };

    return (
        <div className="signin-container">
            <form onSubmit={handleSignIn} className="signin-form">
                <h2>ĐĂNG NHẬP VÀO SPOTLIGHT</h2>
                <div className="input-group">
                    <label htmlFor="email">Email hoặc Tên đăng nhập</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">ĐĂNG NHẬP</button>
                    <a href="#" className="forgot-password">Quên mật khẩu?</a>
                </div>
            </form>
        </div>
    );
}

export default SignInPage;

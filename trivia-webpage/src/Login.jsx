import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from "react-router-dom";

const supabase = createClient(
    "https://oxwswcbraxegyjpdkzpm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94d3N3Y2JyYXhlZ3lqcGRrenBtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODAxMDkwMiwiZXhwIjoyMDEzNTg2OTAyfQ.7WMXpuc_gBQpO99zMDVVaUqdEc_ZF7mBP7r8Ir74TL4"
);

const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event) => {
            if (event !== "INITIAL_SESSION") {
                if (event !== "SIGNED_OUT") {
                    navigate("/");
                } else {
                    navigate("/login");
                }
            }

        });
    });


    return (
        <div className="App">
            <header className="App-header w-96">
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    providers={["discord"]}
                />
            </header>
        </div>
    );
};


export default Login;
 
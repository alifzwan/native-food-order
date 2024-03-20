import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

// This file is to Fetching the session information 
// Utilize React Context Provider and share it globally

type AuthData = {
    session : Session | null
    loading: boolean
}

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
})


const AuthProvider = ({children}: PropsWithChildren) => {

    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSession = async() => {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
            setLoading(false)
        }
        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    },[])

    
  return (
    <AuthContext.Provider value={{ session, loading }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
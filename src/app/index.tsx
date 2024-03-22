import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/provider/AuthProvider';
import { supabase } from '@/lib/supabase';
import Button from '@/components/mainComponents/Button';

// This file is like HOME - "/"

const index = () => {

  const { session, loading, isAdmin } = useAuth()

  console.log("Session: ", session)
  console.log("Loading: ", loading)
  console.log("isAdmin:", isAdmin)

  if (loading) {
    return <ActivityIndicator />
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />
  }

  if (!isAdmin) {
    return <Redirect href={'/(user)'}/>
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10}}>
      <Link href={'/(user)/menu'} asChild >
        <Button text="User" />
      </Link>

      <Link href={'/(admin)/menu'} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  )
};

export default index;
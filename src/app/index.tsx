import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/provider/AuthProvider';
import { supabase } from '@/lib/supabase';

// This file is like HOME - "/"

const index = () => {

  const { session, loading } = useAuth()

  if(loading){
    return <ActivityIndicator />
  }

  if(!session){
    return <Redirect href={"/"} />
  }
 

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10}}>

      <Link href={'/(user)/menu'} asChild >
        <Button text="User" />
      </Link>

      <Link href={'/(admin)/menu'} asChild>
        <Button text="Admin" />
      </Link>

      <Link href={'/sign-in'} asChild>
        <Button text="Sign in" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign Out" />
    </View>
  );
};

export default index;
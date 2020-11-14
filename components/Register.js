import React from 'react';
import {View, Text} from 'react-native';

function Register() {
  const [email, setEmail]=useState("");
  const [password, setPassword] = useState("");
const _onPressRegister = ()=>{
  console.log({email, password})
  appStore.registerUser({email:email, password:password})
  };

  return (
    <View>
      <Text>Kindly Register</Text>
      <Text>to use this app</Text>
      <View>
      <Text>{appStore._users[0] && appStore._users[0].name}</Text>
        <Text>email:</Text>
        <TextInput onChangeText={(text)=>{setEmail(text)}}/>
        <Text>password:</Text>
        <TextInput onChangeText={text => setPassword(text)}/>
        <Button title="Register"
  onPress={_onPressRegister}
  accessibilityLabel="Register New User"
/>
      </View>
    </View>
  );
}

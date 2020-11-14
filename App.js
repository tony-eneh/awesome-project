import React, { useState } from 'react';
import { createStore } from 'redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

// const store = createStore(reducer, initialState);
export default function App() {
  const users = [];
  const [currentUser, setCurrentUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // my naive router for navigating between views
  const [page, setPage] = useState('login');
  const [loginError, setLoginError] = useState('');

  const registerUser = (user) => {
    users.push(user);
    setCurrentUser(user);
    console.log('newly added user', user);
    console.log('list of users', users);
  };
  const handleLogin = (user) => {
    console.log('users before i try to authenticate login', users);
    const foundUser = users.find((usr, i) => {
      console.log('user', i, ':', user);
      return usr.email === user.email && usr.password === user.password;
    });

    if (foundUser) {
      setCurrentUser(foundUser);
      setIsLoggedIn(true);
      setPage('dashboard');
    } else {
      setLoginError('login');
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={{}}>
          <View style={styles.body}>
            {page === 'login' && !isLoggedIn && (
              <Login
                onAttemptLogin={handleLogin}
                error={loginError}
                gotoRegister={() => setPage('register')}
              />
            )}
            {!!currentUser && <Header style={styles.header} setPage={setPage} />}
            {page === 'dashboard' && isLoggedIn && (
              <Dashboard currentUser={currentUser} setPage={setPage} />
            )}

            {page === 'profile' && isLoggedIn && (
              <Profile
                currentUser={currentUser}
                onUserChange={setCurrentUser}
              />
            )}
            {page === 'about' && isLoggedIn && <About />}
            {page === 'settings' && isLoggedIn && (
              <Settings currentUser={currentUser} />
            )}
            {page === 'logout' && isLoggedIn && (
              <Logout
                currentUser={currentUser}
                setPage={setPage}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
            {page === 'register' && !isLoggedIn && (
              <Register
                onRegister={registerUser}
                setPage={setPage}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function About() {
  return (
    <View>
      <Text>About</Text>
    </View>
  );
}

function Dashboard({ currentUser, setPage }) {
  return (
    <View>
      <Text>Welcome <Text style={{fontWeight: 'bold'}}>{currentUser.name}</Text></Text>
      <Text>
        You can always change your name by visiting your
        <Text
          onPress={() => {
            setPage('profile');
          }}
          style={{ color: 'blue' }}>
          {' '}
          Profile Page{' '}
        </Text>
      </Text>
    </View>
  );
}
function Header({ setPage }) {
  return (
    <View>
      <Text>Awesome App</Text>
      <View
        style={{
          flexDirection: 'row',
          flex: '1 1 auto',
          justifyContent: 'space-around',
        }}>
        <Text
          onPress={() => setPage('dashboard')}
          style={{ backgroundColor: 'pink' }}>
          Home
        </Text>
        <Text
          onPress={() => setPage('profile')}
          style={{ backgroundColor: 'pink' }}>
          Profile
        </Text>
        <Text
          onPress={() => setPage('settings')}
          style={{ backgroundColor: 'pink' }}>
          Settings
        </Text>
        <Text
          onPress={() => setPage('about')}
          style={{ backgroundColor: 'pink' }}>
          About
        </Text>
        <Text
          onPress={() => setPage('logout')}
          style={{ backgroundColor: 'pink' }}>
          Logout
        </Text>
      </View>
    </View>
  );
}

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const _onPressLogin = () => {
    console.log('logged in user', { email, password });
    props.onAttemptLogin({ email, password });
  };

  return (
    <View>
      <Text>Login</Text>
      {props.error && (
        <Text style={styles.danger}>wrong email or password. Try again</Text>
      )}
      <View>
        <Text>email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text>password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Login"
          onPress={_onPressLogin}
          accessibilityLabel="Register New User"
        />
        <Text>
          not yet a member?.{' '}
          <Text style={styles.link} onPress={props.gotoRegister}>
            register
          </Text>
        </Text>
      </View>
    </View>
  );
}

function Logout({ setPage, setIsLoggedIn }) {
  return (
    <View>
      <Button
        onPress={() => {
          setIsLoggedIn(false);
          setPage('login');
        }}
        title="Logout"
      />
    </View>
  );
}

function Profile() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const _onPressRegister = () => {
    if (!name || !email || !password) {
      setError('error');
      return;
    }
    console.log('new user', { name, email, password });
    props.onRegister({ name, email, password });
    props.setIsLoggedIn(true);
    props.setPage('dashboard');
  };

  return (
    <View>
      <Text>Kindly Register</Text>
      <Text>to use this app</Text>
      <View>
        {error && <Text style={styles.danger}>pls fill in all fields</Text>}
        <Text>name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <Text>email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text>password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Register"
          onPress={_onPressRegister}
          accessibilityLabel="Register New User"
        />
      </View>
    </View>
  );
}

function Settings() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  danger: {
    borderRadius: 5,
    borderColor: 'rgb(255,0,0)',
    backgroundColor: 'rgb(255, 200 ,200)',
    color: 'rgb(255,0,0)',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'lightblue',
    border: 'solid blue',
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 5,
  },
  body: {
    padding: 10,
  },
  link: {
    color: 'pink',
  },
  header:{
    marginBottom: 20,
    backgroundColor: '#888888',
  }
});

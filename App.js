import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



const Stack = createNativeStackNavigator();

function SearchUser({navigation}) {
  const [userName, setUserName] = useState('');
  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <View style={[{ flexDirection: 'row', marginHorizontal: 16 }]}>
        <TextInput
          style={styles.searchBar} placeholder={'Nome do usuário'}
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home', {
            userName: userName,
          })} style={[{padding: 20, margin:20, backgroundColor: 'blue'}]}>
        <Text>Ajeitar botão</Text>
      </TouchableOpacity>
    </View>
  );
}

function Home({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { userName } = route.params;

  useEffect(() => {
    fetch('https://api.github.com/users/' + userName)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View style={styles.container}>
      <View style={[{ marginTop: 45 }]}>
        <View style={[{ flexDirection: 'row', alignItems: 'flex-end', gap: -35 }]}>
          <Image source={{ uri: data.avatar_url }} style={styles.img}></Image>
          <SearchButton />
        </View>
        <Text style={styles.userName}>{data.name}</Text>
        <Text style={styles.userID}>@{data.login}</Text>
      </View>
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, marginTop: 47 }]}>
        <ListButton title={'Bio'} desc={'Um pouco sobre o usuário'} icon={'user'} />
      </View><View style={[{ flexDirection: 'row', marginHorizontal: 20, }]}>
        <ListButton title={'Orgs'} desc={'Organizações que o usuário faz parte'} icon={'headset'} />
      </View>
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, }]}>
        <ListButton title={'Repositórios'} desc={'Lista contendo todos os repositórios'} icon={'file'} />
      </View>
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, }]}>
        <ListButton style={styles.ts} title={'Seguidores'} desc={'Lista de seguidores'} icon={'followers'} />
      </View>
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, marginTop: 25, backgroundColor: '#FFFFFF' }]}>
        <ResetButton/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchUser" component={SearchUser}></Stack.Screen>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    /*<View style={styles.container}>
      <View style={[{ marginTop: 45 }]}>
        <View style={[{flexDirection: 'row', alignItems: 'flex-end', gap: -35}]}>
          <Image source={{ uri: data.avatar_url }} style={styles.img}></Image>
          <SearchButton/>
        </View>
        <Text style={styles.userName}>{data.name}</Text>
        <Text style={styles.userID}>@{data.login}</Text>
      </View>
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, marginTop: 47 }]}>
        <ListButton title={'Bio'} desc={'Um pouco sobre o usuário'} icon={'user'} />
      </View><View style={[{ flexDirection: 'row', marginHorizontal: 20, }]}>
        <ListButton title={'Orgs'} desc={'Organizações que o usuário faz parte'} icon={'headset'} />
      </View>
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, }]}>
        <ListButton title={'Repositórios'} desc={'Lista contendo todos os repositórios'} icon={'file'} />
      </View>
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, }]}>
        <ListButton style={styles.ts} title={'Seguidores'} desc={'Lista de seguidores'} icon={'followers'} />
      </View>
      <View style={[{ flexDirection: 'row', marginHorizontal: 20, marginTop: 25, backgroundColor: '#FFFFFF' }]}>
        <ResetButton />
      </View>
      <StatusBar style="auto" />
    </View>*/
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingStart: 10,
    paddingVertical: 10,
    borderRadius: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  userName: {
    marginTop: 15,
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
  },
  userID: {
    fontSize: 16,
    fontWeight: 600,
    color: '#B5B6BA',
    textAlign: 'center',
  },
  img: {
    borderRadius: 47,
    width: 162,
    height: 157,
  },
  textButtonStyle: {
    fontSize: 16,
    fontWeight: '700',

  },
  resetButtonStyle: {
    flex: 1,
    paddingHorizontal: 23,
    paddingTop: 20,
    paddingBottom: 17,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  searchButton: {
    backgroundColor: '#010101',
    padding: 13,
    borderRadius: 14,

  }
});

export function ListButton(props) {
  const icon = props.icon
  const title = props.title;
  const desc = props.desc;
  let buttonStyle;
  if (title == 'Seguidores') {
    buttonStyle = {
      flex: 1,
      paddingHorizontal: 23,
      paddingTop: 20,
      paddingBottom: 17,
      borderStyle: 'solid',
      borderColor: '#F0F0F0',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      borderBottomStartRadius: 14,
      borderBottomEndRadius: 14,
    };
  }
  if (title == 'Bio') {
    buttonStyle = {
      flex: 1,
      paddingHorizontal: 23,
      paddingTop: 20,
      paddingBottom: 17,
      borderStyle: 'solid',
      borderColor: '#F0F0F0',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      borderTopStartRadius: 14,
      borderTopEndRadius: 14,
    };
  }
  if (title != 'Bio' & title != 'Seguidores') {
    buttonStyle = {
      flex: 1,
      paddingHorizontal: 23,
      paddingTop: 20,
      paddingBottom: 17,
      borderStyle: 'solid',
      borderColor: '#F0F0F0',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
    };
  }
  return (
    <TouchableOpacity style={buttonStyle}>
      <View style={[{ flexDirection: 'row', gap: 11 }]}>
        <View style={[{ borderColor: '#F0F0F0', borderRadius: 5, borderType: 'solid', borderWidth: 1, justifyContent: 'center', paddingHorizontal: 20 }]}>
          <IconButton iconType={icon} size={20} />
        </View>
        <View>
          <Text style={[{ fontWeight: '700', fontSize: 16 }]}>{title}</Text>
          <Text style={[{ fontWeight: '400', fontSize: 10, color: '#626262' }]}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export function ResetButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.resetButtonStyle} onPress={() => navigation.navigate('SearchUser')}>
      <View style={[{ flexDirection: 'row', gap: 10, justifyContent: 'center' }]}>
        <Entypo name="log-out" size={20} color="#000000" />
        <Text style={[{ fontWeight: '400', fontSize: 16, }]}>Resetar</Text>
      </View>
    </TouchableOpacity>
  )
}

export function IconButton(props) {
  iconType = props.iconType;
  switch (iconType) {
    case 'user':
      return (
        <FontAwesome name="user" size={20} />
      );
    case 'headset':
      return (
        <MaterialIcons name="headset-mic" size={20} />
      );
    case 'file':
      return (
        <MaterialCommunityIcons name="file-document-outline" size={20} />
      );
    case 'followers':
      return (
        <MaterialCommunityIcons name="robot-happy-outline" size={20} />
      );
    default:
      return (
        <MaterialIcons name="headset-mic" size={20} />
      );
  }
}

export function SearchButton() {
  return (
    <TouchableOpacity style={styles.searchButton}>
      <FontAwesome name="search" size={25} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
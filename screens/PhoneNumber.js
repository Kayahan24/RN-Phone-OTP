import React, { useState ,useRef} from 'react';
import PhoneInput from '../lib/PhoneInput';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Button,
  Alert,
  Dimensions
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';


export default function PhoneNumber(props) {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
      <View style={styles.bigCircle}></View>
      <View style={styles.smallCircle}></View>
        <SafeAreaView style={styles.wrapper}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="TR"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
            }}
            countryPickerProps={{withAlphaFilter:true}}
            withDarkTheme
            withShadow
            autoFocus
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              checkValid ?  props.onSubmit(formattedValue) : Alert.alert(
                'Hatalı Veya Eksik Giriş Yaptınız',
                'Lütfen Numarayı Doğru Formatta Giriniz',
                [
                  {
                    text: 'Kapat',
                  },
                ],);
             
            }}>
            <Text style={styles.buttonText}>Gönder</Text>
          </TouchableOpacity>
          
        </SafeAreaView>
        

      </View>

    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius:30,
    marginTop: 20,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F78E1E',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText:{
    color: 'white',
    fontSize: 14,
    fontWeight:'bold',
  },
  redColor: {
    backgroundColor: '#F57777'
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.47,
    height: Dimensions.get('window').height * 0.47,
    backgroundColor: '#e02a48',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.39,
    height: Dimensions.get('window').height * 0.39,
    backgroundColor: '#f57c00',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
});

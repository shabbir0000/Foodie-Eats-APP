import { View, Text, Image, TouchableOpacity, Alert, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc'
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Error, Input, InputButton, Lootieview } from '../Components/LSFC'
import { Formik } from 'formik'
import * as Yup from 'yup'
import RNRestart from 'react-native-restart';
import BottomTabs from './BottomTabs';

const Logout = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const [picprofile, setpicprofile] = useState("https://coffee.alexflipnote.dev/random")

  const [name, setname] = useState("")
  const Validation = Yup.object().shape({

    email: Yup.string().required("Plzz Write Correctly")

  })
  //const { email, name, emailverified, piclink } = route.params;

  useEffect(() => {
    setname(user.displayName)
    setpicprofile("https://coffee.alexflipnote.dev/random")
  }, [name])



  const signout = async () => {
    try {
      signOut(auth);
      navigation.navigate("Account");
    }


    catch (error) {
      Alert.alert("Plzz Login First");
    }
  }




  const update = async (email) => {
    try {
      updateProfile(user, {
        displayName: email,
      }).then(() => {
        Alert.alert("Updated SuccessFully")
        //  setname(data)
        // console.log()
        // RNRestart.Restart();
        //  window.location.reload();
      }).catch((error) => {
        Alert.alert(error.message)
      })
    }


    catch (error) {
      Alert.alert("Plzz Login First");
    }
  }


  return (
    <>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={Validation}
        onSubmit={(values) => (
          update(values.email),
          setModalVisible(!modalVisible)

        )}


      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          values,
          isValid }) => (

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}

          >

            <View style={tw`mt-64`}>

              <Input
                placeholder="EMAIL"
                onchangetext={handleChange('email')}
                onblur={handleBlur('email')}
                value={values.email}
              />

              {/* <Error error={errors.email} /> */}

              <View style={tw`flex-col items-center justify-center pt-5 `}>
                <InputButton bgcolor="black" text={
                  "Update"
                }
                  onPress={handleSubmit}
                />

              </View>
            </View>

          </Modal>

        )}
      </Formik>

      <View style={tw`flex-1 items-center pt-16 ${modalVisible ? `opacity-10` : `bg-white`}`}
      >
        <Image
          source={{
            uri: picprofile
          }}
          style={tw`h-40 w-40 rounded-full  `}
        />


        <TouchableOpacity onPress={() => {
          setModalVisible(true)
        }} style={tw`items-center mt-2 `}>
          <Text style={tw`font-semibold`} >
            {name ? name : "Add Your Name"}
          </Text>
        </TouchableOpacity>

        <Text1 name="Email" type={user.email} />
        <Text1 name="Email-Verified" type={user.emailVerified ? "True" : "False"} />
        <Text1 name="Joined At" type={user.metadata.creationTime} />
        <Text1 name="Last Login At" type={user.metadata.lastSignInTime} />

        <InputButton text="Logout" bgcolor="black"

          onPress={() => {
            signout()
          }}
        />
      </View>
      <BottomTabs navigation={navigation} />
    </>
  )
}

export default Logout


const Text1 = ({ name, type }) => (
  <>
    <View style={tw`mt-6 items-center justify-center rounded-md shadow-md w-64 h-16`}>
      <Text style={tw`text-lg`}>
        {name}
      </Text>
      <Text >
        {type}
      </Text>
    </View>
  </>
)
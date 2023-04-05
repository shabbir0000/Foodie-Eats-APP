import { View, Text, SafeAreaView, Alert } from 'react-native'
import React ,{useState} from 'react'
import tw from 'twrnc'
import { Error, Input, InputButton, Lootieview } from '../Components/LSFC'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { getAuth, sendPasswordResetEmail,sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/';
import { app } from '../../Firebase'

const Forgetpass = ({ navigation, route }) => {
 const{data2} = route.params;
 //const [data2, setdata2] = useState(true)
  const db = getFirestore(app);
  const coll = collection(db, "order1");
  const auth = getAuth();

  const Validation = Yup.object().shape({
    
    email: Yup.string().required(data2 ? "Password Atleast 6 Character" : "Email must be filled")
    
  })
   
  const loginwithemailandpass =async(pass) => {
    const { data } = route.params;
    createUserWithEmailAndPassword(auth, data.email, pass)
    .then((data1) => {
      

      const user = auth.currentUser;
      addDoc(coll, {

        uid: user.uid,
        email: user.email,
        items: [],
        restaurentName: "",
        createdAt: serverTimestamp(),

      })

      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("verification email has been sent");
        })
        console.log(data1.user.email)
      
        Alert.alert("Congratulation You Have Sucessfully Sign-up")
      navigation.navigate("Home" ,{
        email : data.email ,
        name : data.name,
        emailverified : data.verified_email,
        piclink : data.picture,

      });
    })
    .catch((error) => {
      Alert.alert("this :", error.message)
    })
  }

  

  return (
    <>
      <Formik
        initialValues={{ email: ""  }}
        validationSchema={Validation}
        onSubmit={(values) => (
          data2 ?
           
            (
             loginwithemailandpass(values.email)      
            )
            :
            (
              sendPasswordResetEmail(auth, values.email)
                .then(() => {
                  Alert.alert("Email Has Been Send")
                  navigation.navigate("Account");
                })
            )
            
  )}


      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          values,
          isValid }) => (

          <SafeAreaView style={tw`pt-10 flex-1`}>
            <Lootieview source={require("../Animation/72462-check-register.json")} />

            <View style={tw`flex-row justify-center`}>
              <Text style={tw`text-3xl font-bold`}>
               {
                data2 ? "SET NEW PASS" :"FORGET-PASS"
               }
              </Text>
            </View>

            {
              data2 ?
              
              (
                <>
                  <Input
                    placeholder="PASSWORD"
                    onchangetext={handleChange('email')}
                    onblur={handleBlur('email')}
                    value={values.email}
                  />

                  <Error error={errors.email} />
                </>
              )
              :
                (
                  <>
                    <Input
                      placeholder="EMAIL"
                      onchangetext={handleChange('email')}
                      onblur={handleBlur('email')}
                      value={values.email}
                    />

                    <Error error={errors.email} />
                  </>
                )
               
            }

            <View style={tw`flex-col items-center justify-center pt-5 `}>
              <InputButton bgcolor="black" text= {
                data2 ? "SIGN-UP" :"SEND FORGET LINK"
               }
                onPress={handleSubmit}
              />
              <Text>
                Check Reset Email in Spam
              </Text>
            </View>
          </SafeAreaView>
        )}
      </Formik>
    </>

  )
}


export default Forgetpass
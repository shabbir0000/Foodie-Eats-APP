import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import {Error, Input, InputButton, Lootieview } from '../Components/LSFC'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from 'firebase/auth'
import { app } from '../../Firebase'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser';
//import Error from '../Components/Error'
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp, limit, query, where } from 'firebase/firestore/';
import { async } from '@firebase/util'
import LottieView from 'lottie-react-native'
import Forgetpass from './Forgetpass'


WebBrowser.maybeCompleteAuthSession();

const Signup = ({ navigation }) => {

  const [GetData, setGetData] = useState([{}]);
  const [accesstoken, setaccesstoken] = useState("");
  const [loading, setloading] = useState(false)
  const [data1, setdata1] = useState("");
  const [data2, setdata2] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore(app);
  const coll = collection(db, "order1");

  // validation setup
  const Validation = Yup.object().shape({

    email: Yup.string().required("Email must be filled"),
    password: Yup.string().min(5, "Min five char required").required("Password must be filled"),
  })

  const loginwithemailandpass = async (email, pass) => {
    
      
      createUserWithEmailAndPassword(auth, email, pass)
      .then((data)=>{
            console.log(data.user.email)
        navigation.navigate("Account");
      
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
      })
      .catch((error)=>{
           Alert.alert("this :" , error.message)
      })
  }


  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId: '620279660896-ath7gbl23rtnbhm66tmbg04k8hgo1s0p.apps.googleusercontent.com',
      iosClientId: '620279660896-i6dsmf2fp6sibq74kaufbsehfkkqu4tn.apps.googleusercontent.com',
      expoClientId: '620279660896-i6ir1r2cmfsj34a2psrc80retdgsgbse.apps.googleusercontent.com',

    }
  )



  useEffect(() => {

    if (response?.type === "success") {
       setloading(true);
      setaccesstoken(response.authentication.accessToken);
      console.log(accesstoken);
      if (accesstoken) {
        getdata()
        setTimeout(() => {
          setloading(false);




        }, 2000)
        // console.log("1 : ",data1.email);
      }

    }



    //   return(()=>{
    //     if (data1) {


    //       const q = query(coll,where("email", "==",data1.email));
    //       setGetData(null);
    //       onSnapshot(q, snapshot => {
    //         setGetData(snapshot.docs.map(doc => (
    //       //    data:  doc.data(),
    //            doc.data()

    //          )))
    //         })

    //         GetData.map((info)=>{
    //           console.log(info.email);
    //            if(info.email === data1.email )
    //  {

    //      Alert.alert("Email ALready  Exits")
    //  }
    //      else
    //      {
    //        Alert.alert("Email Not  Exits")
    //      //   addDoc(coll, {

    //      //     uid: data.id,
    //      //     name: data.name,
    //      //     email: data.email,
    //      //     verified: data.verified_email,
    //      //     items: [],
    //      //     restaurentName: "",
    //      //     createdAt: serverTimestamp(),

    //      //   })



    //      // navigation.navigate("Home", {
    //      //   email: data.email,
    //      //   name: data.name,
    //      //   emailverified: data.verified_email,
    //      //   piclink: data.picture,
    //      // })

    //    }
    //  }

    //      )
    //       }
    //   })

    return () => {
      // unSubscribe()
    }

  }, [response, accesstoken])


  const getdata = async () => {
    try {

      let userinfo = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accesstoken}` }
      })

      userinfo.json().then((data) => {
        console.log(data)
         navigation.navigate("forget" ,{
        data,
        data2,
         })
        // setdata1(data)
        // console.log(data);

        // onSnapshot(query(coll, where("email", "==", data.email)), snapshot => {
        //   setGetData(snapshot.docs.map(doc => (
        //     //    data:  doc.data(),
        //     doc.data()

        //   )))


        // })
        //  const q = query(coll, where("email", "==", data.email));
        //  setGetData(null);
        //   GetData.map((info) => {
        //     console.log(info.email);

        // //  if (  info.email == data.email )
        // //  {

        // //      Alert.alert("Email Already Exist")
        // //      navigation.navigate("Signup");

        // //  }
        // //  else{
        // //   Alert.alert("Congoo YOu Signup Successfully")
        // // //  navigation.navigate("Account");
        // //  }
        //     // if (info.email === data1.email) {

        //     //   Alert.alert("Email ALready  Exits")
        //     // }
        //     // else {
        //     //   Alert.alert("Email Not  Exits")
        //     //   //   addDoc(coll, {

        //     //   //     uid: data.id,
        //     //   //     name: data.name,
        //     //   //     email: data.email,
        //     //   //     verified: data.verified_email,
        //     //   //     items: [],
        //     //   //     restaurentName: "",
        //     //   //     createdAt: serverTimestamp(),

        //     //   //   })



        //     //   // navigation.navigate("Home", {
        //     //   //   email: data.email,
        //     //   //   name: data.name,
        //     //   //   emailverified: data.verified_email,
        //     //   //   piclink: data.picture,
        //     //   // })

        //     // }


        //   })

        
      })
      
    } catch (error) {
      console.log(error);
    }
  }




  return (

    <>

      {
        loading ? (
          <>
            <LottieView style={tw`self-center mt-24 h-72`}
              source={require("../Animation/90859-request-checking.json")}
              autoPlay
              loop={true}
              speed={0.5}
            />
          </>) : (
          <>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Validation}
              onSubmit={(values) => (
                loginwithemailandpass(values.email, values.password)
              
                //adddata()
              )}>


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
                      SIGNUP
                    </Text>
                  </View>

                  <Input
                    placeholder="EMAIL"
                    onchangetext={handleChange('email')}
                    onblur={handleBlur('email')}
                    value={values.email}
                  />

                  <Error error={errors.email} />


                  <Input
                    placeholder="PASSWORD"
                    onchangetext={handleChange('password')}
                    onblur={handleBlur('password')}
                    value={values.password}
                  />

                  <Error error={errors.password} />

                  <View style={tw`flex-row justify-center pt-5 `}>
                    <InputButton bgcolor="black" text="SIGN-UP"
                      onPress={handleSubmit}
                    />
                  </View>

                  <InputButton bgcolor="red-500" text={"GOOGLE"}
                    onPress={() => {
                      promptAsync({ showInRecents: true })

                    }}
                  />
               
                  <Text>


                    {
                      //if GetData == null so the condition never run
                    //  GetData[0].email 
                      
                       
                      //    Alert.alert("massege")
                      //  )
                      // //   GetData.length ?

                      //     :

                      //     (
                          //  GetData.map((info) => {
                          //     //console.log(GetData[0].email)
                          //   //  setdata2(true)
                          //     if (data1.email === info.email) {
                          //       Alert.alert("Email Already Exist")
                          //       setGetData([]);
                          //     }
                          //     if (info === []) {
                          //       Alert.alert("not is exist")
                          //     }
                              
                          //   })
                         
                      //     )
                         
                      //     (
                      //       // navigation.navigate("Signup")
                      //       Alert.alert("not  exist")

                      //     )


                      // )
                      //   :
                      //   (
                      //     Alert.alert("not an exist")
                      //   )

                      // GetData ? 
                      // (
                      // GetData[0].email ? 
                      // (
                      //   Alert.alert("Email ALready Exist")
                      // )
                      // :
                      // (
                      //   Alert.alert("Not Exist")
                      // )
                      // )
                      // :
                      // (
                      //   console.log("bbb")
                      // )


                      // )
                      // :
                      // (
                      //   <>
                      //   <Text>
                      //    {
                      //      Alert.alert("error")
                      //    }
                      //   </Text>
                      //   </>
                      //  )





                    }

                  </Text>
                </SafeAreaView>
              )}
            </Formik>
          </>
        )
      }
    </>

  )
}


export default Signup
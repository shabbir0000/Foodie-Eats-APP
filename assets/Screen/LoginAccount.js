import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Error, Input, InputButton, Lootieview, Textview } from '../Components/LSFC'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth'


const LoginAccount = ({ navigation }) => {

    const [data2, setdata2] = useState(false)
    
    
    
    const Validation = Yup.object().shape({
        email: Yup.string().email().required("Email must be filled"),
        password: Yup.string().min(5, "Min five char required").required("Password must be filled"),

    })

    const auth = getAuth();
   // const user = auth.currentUser;

    const loginwithemailandpass = async (email, pass) => {
        try {
            signInWithEmailAndPassword(auth, email, pass)
            .then((data)=>{
                console.log(data)
              //  console.log(user.emailVerified)
               navigation.navigate("Home");
            })
            .catch((error)=>{
                 Alert.alert(error.message)
            });
           
        } catch (error) {
            Alert.alert("Plzz Enter Valid Email Or Pass");
        }
    }

 

    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Validation}
                onSubmit={(values, { resetForm }) => (
                    loginwithemailandpass(values.email, values.password),
                    resetForm({ values: "" })
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
                        <Lootieview source={require("../Animation/110146-login.json")} />
                        <View style={tw`flex-row justify-center`}>
                            <Text style={tw`text-3xl font-bold`}>
                                LOGIN
                            </Text>
                        </View>

                        <Input
                            placeholder="EMIAL"
                            onchangetext={handleChange('email')}
                            onblur={handleBlur('email')}
                            value={values.email}
                        />

                        <Error error={errors.email} />


                        <Input placeholder="PASSWORD"
                            onchangetext={handleChange('password')}
                            onblur={handleBlur('password')}
                            value={values.password}
                            entry={true}
                        />
                        <Error error={errors.password} />

                        <View style={tw`flex-row justify-center pl-35 pt-3 `}>
                            <Textview textt="forget pass ?" />

                            <TouchableOpacity
                                title="login"
                                onPress={() => {
                                    navigation.navigate("forget",{
                                        data2,
                                    });
                                }
                                }
                            >
                                <Text style={tw`text-base text-black font-thin ml-3 `}>
                                    click
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <InputButton bgcolor="black" text="LOGIN"
                            onPress={handleSubmit}


                        />

                        <View style={tw`flex-row justify-center pt-5 `}>
                            <Textview textt="No Account?" />

                            <TouchableOpacity
                                title="login"
                                onPress={() => {
                                    navigation.navigate("Signup");
                                }
                                }

                            >
                                <Text style={tw`text-base text-black font-thin ml-3 `}>
                                    signup
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </SafeAreaView>
                )}
            </Formik>
        </>
    )
}



export default LoginAccount
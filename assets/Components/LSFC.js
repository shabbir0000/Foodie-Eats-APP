import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import LottieView from 'lottie-react-native'


export const Input = ({ placeholder, onchangetext, onblur, value, entry }) => (
    <>
        <View style={tw`flex-row justify-center pt-5 `}>
            <TextInput
                placeholder={placeholder}
                onChangeText={onchangetext}
                onBlur={onblur}
                value={value}
                secureTextEntry={entry}
                style={tw`h-10 w-72 border-black border text-center`}
            ></TextInput>
        </View>
    </>
)

export const Lootieview = ({ source }) => (
    <>

        <LottieView style={tw`self-center mb-7 h-44`}
            source={source}
            autoPlay
            loop={true}
            speed={0.5}
        />

    </>
)

export const Error = ({ error }) => (
    <>

        {error && (<>
            <Text style={tw`ml-10 pt-2 text-red-500`}>
                {error}
            </Text>
        </>)}

    </>
)


export const Textview = ({ textt }) => (
    <>

        <Text style={tw`text-base font-thin`}>
            {textt}
        </Text>

    </>
)

export const InputButton = ({ bgcolor, text, onPress, disabled }) => (
    <>
        <View style={tw`flex-row justify-center pt-5 `}>
            <TouchableOpacity
                title="login"
                style={tw`bg-${bgcolor} rounded-2xl h-10 w-60 justify-center`}
                onPress={onPress}
                disabled={disabled}

            >
                <Text style={tw`text-xl text-white font-bold text-center`}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    </>
)

export const CatogoryButton = ({ onPress, source, text }) => (
    <>
        <View
            style={
                tw`bg-white mt-2 py-1 px-5 `
            }
        >

            <TouchableOpacity
                onPress={onPress}
            >
                <View style={tw`items-center mr-3 ml-3 `} >

                    <Image
                        source={source}
                        style={tw`h-7 w-7 `}
                    />


                    <Text
                        style={tw`font-bold text-base`}
                    >
                        {text}
                    </Text>


                </View>
            </TouchableOpacity>
        </View>

    </>
)
import React from "react";
import { ScrollView } from "native-base";
import { Image, Text, StyleSheet } from "react-native";



export const icone = [
    {
        nome: "PVS",
        imagem: require('../../assets/pvs.png')
    },

    {
        nome:"ESCALA",
        imagem: require('../../assets/escala.png')
    },

    {
        nome:"RSO",
        imagem: require('../../assets/rso.png')
    },

    {
        nome:"DISPENSAS",
        imagem: require('../../assets/dispensas.png')
    },

    {
        nome:"FERIAS",
        imagem: require('../../assets/ferias.png')
    },
]



export function Icone() {
    return (
        <ScrollView>
            {icone.map((icone, index) => (
                <React.Fragment key={index}>
                    <Text>{icone.nome}</Text>
                    <Image source={icone.imagem} />
                </React.Fragment>
            ))}
        </ScrollView>
    );
}

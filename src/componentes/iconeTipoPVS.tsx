import React from "react";
import { ScrollView } from "native-base";
import { Image, Text, StyleSheet } from "react-native";



export const iconeTipoPVS = [
    {
        nome: "Residencial",
        imagem: require('../../assets/recidencial.png')
    },

    {
        nome:"Escolar",
        imagem: require('../../assets/escolar.png')
    },

    {
        nome:"Comercial",
        imagem: require('../../assets/comercial.png')
    },

]



export function IconeTipoPVS() {
    return (
        <ScrollView>
            {iconeTipoPVS.map((icone, index) => (
                <React.Fragment key={index}>
                    <Text>{icone.nome}</Text>
                    <Image source={icone.imagem} />
                </React.Fragment>
            ))}
        </ScrollView>
    );
}

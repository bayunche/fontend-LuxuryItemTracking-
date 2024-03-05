import { View } from "./Themed";

 import { StyleSheet } from 'react-native'

import React, { useState, useEffect } from "react";

import ZoomableImage from "./AnimateScroll";
export default function ViewItem() {
    return (
        <View style={styles.container} >
    <ZoomableImage uri="https://github.com/bayunche/fontend-LuxuryItemTracking-/blob/c203917aea23a2072907d25367260ae32825eebe/ddn-font-end/assets/images/115907691_p0_master1200.jpg"></ZoomableImage>

        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    }
})
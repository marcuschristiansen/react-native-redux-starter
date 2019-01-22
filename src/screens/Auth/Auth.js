import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class AuthScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>AUTH SCREEN</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AuthScreen; 
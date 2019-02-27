import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SocialIcon, FormLabel, FormInput, FormValidationMessage, Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";

import { tryAuth } from '../../store/actions/index';
import validate from '../../utility/validation';

class SigninScreen extends Component {

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    state = {
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                }
            },
        }
    }

    goToScreen(screenName) {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName
            }
        });
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue)
                    }
                }
            }
        })
    }

    handleSignin = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onSignin(authData);
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior='padding'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View>
                            <Input
                                inputStyle={styles.input}
                                placeholder='Email'
                                autoCapitalize='none'
                                autoComplete='email'
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                                value={ this.state.controls.email.value }
                                onChangeText={ (val) => this.updateInputState('email', val) }
                                errorMessage={'Invalid Email'}
                            />

                            <Input
                                inputStyle={styles.input}
                                placeholder='Password'
                                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                                value={ this.state.controls.password.value }
                                onChangeText={ (val) => this.updateInputState('password', val) }
                                secureTextEntry
                                errorMessage={'Invalid Email'}
                            />
                        </View>

                        <View>
                            <Button
                                title='Sign in' 
                                onPress={this.handleSignin}
                                containerStyle={styles.buttonContainer}
                                // raised
                                disabled={
                                    !this.state.controls.email.valid ||
                                    !this.state.controls.password.valid
                                }
                                loading={ this.props.isLoading }
                            />
                        </View>
                        
                        <View style={{ alignItems: 'center' }}>
                            <Text><Text onPress={() => this.goToScreen('goingout.PasswordRecoveryScreen')}>Forgot password?</Text></Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 10,
    },
    buttonContainer: {
        padding: 7,
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignin: authData => dispatch(tryAuth(authData, 'signin'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
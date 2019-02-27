import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SocialIcon, FormLabel, FormValidationMessage, Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';

import { tryAuth } from '../../store/actions/index';
import validate from '../../utility/validation';

class SignupScreen extends Component {

    constructor(props) {
        super(props);
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
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                }
            }
        }
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if(this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
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
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue)
                    }
                }
            }
        })
    }

    handleSignup = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onSignup(authData);
        alert('WORKED');
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
                                autoCorrect={ false }
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

                            <Input
                                inputStyle={styles.input}
                                placeholder='Confirm password'
                                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                                value={ this.state.controls.confirmPassword.value }
                                onChangeText={ (val) => this.updateInputState('confirmPassword', val) }
                                secureTextEntry
                                errorMessage={'Invalid Email'}
                            />
                        </View>

                        <View>
                            <Button
                                title='Register' 
                                onPress={this.handleSignup}
                                // raised
                                containerStyle={styles.buttonContainer}
                                disabled={
                                    !this.state.controls.confirmPassword.valid ||
                                    !this.state.controls.email.valid ||
                                    !this.state.controls.password.valid
                                }
                                loading={ this.props.isLoading }
                            />
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
        onSignup: authData => dispatch(tryAuth(authData, 'signup'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Navigation } from "react-native-navigation";
import { SocialIcon, FormLabel, FormInput, FormValidationMessage, Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import validate from '../../utility/validation';

import { tryAuth } from '../../store/actions/index';
import { addExample, deleteExample, selectExample } from '../../store/actions/index';

class PasswordRecovery extends Component {

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
            }
        }
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
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

    handlePasswordRecovery = () => {
        const authData = {
            email: this.state.controls.email.value,
        };
        this.props.onPasswordRecovery(authData);
        // Take user back to login screen
        Navigation.pop(this.props.componentId);
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior='padding'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        <View>
                            <Button
                                title='Recover password' 
                                onPress={this.handlePasswordRecovery}
                                containerStyle={styles.buttonContainer}
                                // raised
                                disabled={
                                    !this.state.controls.email.valid
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
        onPasswordRecovery: authData => dispatch(tryAuth(authData, 'passwordRecovery'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);

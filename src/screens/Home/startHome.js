import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startHome = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-person" : "ios-person", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-wine" : "ios-wine", 30)
    ]).then(sources => {
        Navigation.setRoot({
                root: {
                    sideMenu: {
                        left: {
                            visible: true,
                            component: {
                                name: 'goingout.SideDrawerScreen',
                                passProps: {
                                    text: 'This is a left side menu screen'
                                }
                            }
                        },
                        center: {
                            bottomTabs: {
                                children: [{
                                        stack: {
                                            children: [{
                                                component: {
                                                    name: 'goingout.ListScreen',
                                                    options: {
                                                        topBar: {
                                                            title: {
                                                                text: 'Restaurants'
                                                            },
                                                            leftButtons: [{
                                                                id: 'nav_user_btn',
                                                                icon: sources[0],
                                                                color: 'black'
                                                            }],
                                                            // rightButtons: [{
                                                            //     id: 'nav_logout_btn',
                                                            //     icon: sources[2],
                                                            //     color: 'black'
                                                            // }]
                                                        }
                                                    }
                                                }
                                            }],
                                            options: {
                                                bottomTab: {
                                                    icon: sources[2],
                                                    testID: 'FIRST_TAB_BAR_BUTTON',
                                                    text: 'Restaurants',
                                                }
                                            }
                                        }
                                    },
                                    {
                                        stack: {
                                            children: [{
                                                component: {
                                                    name: 'goingout.ProfileScreen',
                                                    options: {
                                                        topBar: {
                                                            title: {
                                                                text: 'Profile'
                                                            },
                                                            leftButtons: [{
                                                                id: 'nav_user_btn',
                                                                icon: sources[0],
                                                                color: 'black'
                                                            }],
                                                            // rightButtons: [{
                                                            //     id: 'nav_logout_btn',
                                                            //     icon: sources[2],
                                                            //     color: 'black'
                                                            // }]
                                                        }
                                                    }
                                                }
                                            }],
                                            options: {
                                                bottomTab: {
                                                    icon: sources[1],
                                                    testID: 'SECOND_TAB_BAR_BUTTON',
                                                    text: 'Profile',
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        // right: {
                        //     component: {
                        //         name: 'goingout.SideDrawerScreen',
                        //         passProps: {
                        //             text: 'This is a right side menu screen'
                        //         }
                        //     }
                        // }
                    }
                }
            });
        });
};

export default startHome;
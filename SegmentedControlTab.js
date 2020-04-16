import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import PropTypes from 'prop-types';

const handleTabPress = (index, multiple, selectedIndex, onTabPress) => {
    if (multiple) {
        onTabPress(index);
    }
    else if (selectedIndex !== index) {
        onTabPress(index);
    }
};

const TabOption = ({
    isTabActive, index, badge, text,
    firstTabStyle, lastTabStyle,
    tabStyle, activeTabStyle,
    tabTextStyle, activeTabTextStyle,
    tabBadgeContainerStyle, activeTabBadgeContainerStyle,
    tabBadgeStyle, activeTabBadgeStyle,
    onTabPress, textNumberOfLines,
    allowFontScaling, icon, tabIconStyle, showTabText
}) => {
    return (
        <TouchableOpacity style={[
            styles.tabStyle,
            tabStyle,
            isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
            firstTabStyle,
            lastTabStyle]}
            onPress={() => onTabPress(index)}
            activeOpacity={1}>
            <View style={styles.mainContainerStyle}>
                {
                    icon && icon !== null ?
                        <Image style={tabIconStyle} source={icon} resizeMode={'contain'} />
                        :
                        null
                }
                <View style={{ flexDirection: "row" }}>
                    {showTabText
                    ?<Text style={[
                        styles.tabTextStyle,
                        tabTextStyle,
                        isTabActive ? [styles.activeTabTextStyle, activeTabTextStyle] : {}]}
                        numberOfLines={textNumberOfLines}
                        allowFontScaling={allowFontScaling}
                        ellipsizeMode="tail">
                        {text}
                    </Text>
                    : null
                    }
                    {
                        badge ?
                            <View style={[
                                styles.tabBadgeContainerStyle,
                                tabBadgeContainerStyle,
                                isTabActive ? [styles.activeTabBadgeContainerStyle, activeTabBadgeContainerStyle] : {}]}>
                                <Text style={[
                                    styles.tabBadgeStyle,
                                    tabBadgeStyle,
                                    isTabActive ? [styles.activeTabBadgeStyle, activeTabBadgeStyle] : {}]}
                                    allowFontScaling={allowFontScaling}>
                                    {badge}
                                </Text>
                            </View> : false
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
}

const SegmentedControlTab = ({
    multiple, selectedIndex, selectedIndices, values,
    badges, borderRadius, tabsContainerStyle,
    tabStyle, activeTabStyle,
    tabTextStyle, activeTabTextStyle,
    tabBadgeContainerStyle, activeTabBadgeContainerStyle,
    tabBadgeStyle, activeTabBadgeStyle,
    onTabPress, textNumberOfLines,
    allowFontScaling, tabIconStyle, valuesIcon, forceExtremeStyle = false, showTabText
}) => {

    const firstTabStyle = forceExtremeStyle ? {} : [{ borderRightWidth: values.length == 2 ? 1 : 0, borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius }]
    const lastTabStyle = forceExtremeStyle ? {} : [{ borderLeftWidth: 0, borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius }]

    return (
        <View
            style={[styles.tabsContainerStyle, tabsContainerStyle]}
            removeClippedSubviews={false}>
            {
                values.map((item, index) => {
                    return (
                        <TabOption
                            key={index}
                            index={index}
                            badge={badges && badges[index] ? badges[index] : false}
                            isTabActive={multiple ? selectedIndices.includes(index) : selectedIndex === index}
                            text={item}
                            icon={valuesIcon[index]}
                            showTabText={showTabText}
                            textNumberOfLines={textNumberOfLines}
                            onTabPress={(index) => handleTabPress(index, multiple, selectedIndex, onTabPress)}
                            firstTabStyle={(showTabText && (index === 0)) ? [{ borderRightWidth: 0 }, firstTabStyle] : {}}
                            lastTabStyle={(showTabText && (index === values.length - 1)) ? [{ borderLeftWidth: 0 }, lastTabStyle] : {}}
                            tabStyle={[tabStyle, (showTabText && (index !== 0 && index !== values.length - 1)) ? { marginLeft: -1 } : {}]}
                            activeTabStyle={activeTabStyle}
                            tabTextStyle={tabTextStyle}
                            tabIconStyle={tabIconStyle}
                            activeTabTextStyle={activeTabTextStyle}
                            tabBadgeContainerStyle={tabBadgeContainerStyle}
                            activeTabBadgeContainerStyle={activeTabBadgeContainerStyle}
                            tabBadgeStyle={tabBadgeStyle}
                            activeTabBadgeStyle={activeTabBadgeStyle}
                            allowFontScaling={allowFontScaling}
                        />
                    );
                })
            }
        </View>
    );
};

SegmentedControlTab.propTypes = {
    values: PropTypes.array,
    valuesIcon: PropTypes.array,
    showTabText: PropTypes.bool,
    badges: PropTypes.array,
    multiple: PropTypes.bool,
    onTabPress: PropTypes.func,
    selectedIndex: PropTypes.number,
    selectedIndices: PropTypes.arrayOf(PropTypes.number),
    tabsContainerStyle: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    activeTabStyle: ViewPropTypes.style,
    tabTextStyle: Text.propTypes.style,
    tabIconStyle: Image.propTypes.style,
    activeTabTextStyle: Text.propTypes.style,
    tabBadgeContainerStyle: Text.propTypes.style,
    activeTabBadgeContainerStyle: Text.propTypes.style,
    tabBadgeStyle: Text.propTypes.style,
    activeTabBadgeStyle: Text.propTypes.style,
    borderRadius: PropTypes.number,
    textNumberOfLines: PropTypes.number,
    allowFontScaling: PropTypes.bool,
};

SegmentedControlTab.defaultProps = {
    values: ['One', 'Two', 'Three'],
    valuesIcon: [null, null, null],
    showTabText: true,
    badges: ['', '', ''],
    multiple: false,
    selectedIndex: 0,
    selectedIndices: [0],
    onTabPress() { },
    tabsContainerStyle: {},
    tabStyle: {},
    activeTabStyle: {},
    tabTextStyle: {},
    tabIconStyle: {},
    activeTabTextStyle: {},
    tabBadgeContainerStyle: {},
    activeTabBadgeContainerStyle: {},
    tabBadgeStyle: {},
    activeTabBadgeStyle: {},
    borderRadius: 5,
    textNumberOfLines: 1,
    allowFontScaling: true,
};

const styles = StyleSheet.create({
    tabsContainerStyle: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    tabStyle: {
        paddingVertical: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0076FF',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    activeTabStyle: {
        backgroundColor: '#0076FF'
    },
    tabTextStyle: {
        color: '#0076FF'
    },
    activeTabTextStyle: {
        color: 'white'
    },
    tabBadgeContainerStyle: {
        borderRadius: 20,
        backgroundColor: 'red',
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 5,
        marginBottom: 3
    },
    activeTabBadgeContainerStyle: {
        backgroundColor: 'white'
    },
    tabBadgeStyle: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold'
    },
    activeTabBadgeStyle: {
        color: 'black'
    },
    mainContainerStyle: { 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
});

export default SegmentedControlTab
